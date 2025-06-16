import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { RedisService } from '../database/redis.service';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IPost, IPostsResponse } from './types/post.interface';
import { Utilities } from '../shared/utilities.class';
import { CreatePostDto } from './dtos/create-post.dto';
import { EditPostDto } from './dtos/edit-post.dto';
import { GenericPostEvent } from './events/post.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PostRepository } from './repositories/post.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly em: EntityManager,
    private readonly redisService: RedisService,
    private readonly eventEmitter: EventEmitter2,

    @InjectRepository(Post)
    private readonly postsRepository: PostRepository,
  ) {}

  // Todo: implement pagination if there is sufficient time left
  async findAllPosts(): Promise<IPostsResponse> {
    const posts = await this.redisService.remember<IPost[]>(
      `posts`,
      async () =>
        await this.postsRepository.findAll({ orderBy: { updatedAt: 'DESC' } }),
    );

    return { posts: posts || [] };
  }

  async findPost(id: string): Promise<IPost> {
    if (!id) {
      throw new HttpException(
        Utilities.getHttpResponse(`Invalid id '${id}' provided!`),
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.redisService.remember<IPost>(`post:${id}`, async () => {
      const post: IPost = (await this.postsRepository.findOne({ id })) as IPost;

      if (!post?.id) {
        throw new HttpException(
          Utilities.getHttpResponse(`Post with id ${id} not found!`),
          HttpStatus.NOT_FOUND,
        );
      }

      return post;
    });
  }

  async createPost(postDTO: CreatePostDto): Promise<IPost> {
    const { body, title } = postDTO;

    const newPost = new Post(title, body);

    await this.em.persistAndFlush(newPost);
    await this.em.refresh(newPost);

    this.eventEmitter.emit('post.created', new GenericPostEvent(newPost.id));

    return newPost;
  }

  async updatePost(id: string, postDTO: EditPostDto): Promise<IPost> {
    if (!id) {
      throw new HttpException(
        Utilities.getHttpResponse(`Invalid id '${id}' provided!`),
        HttpStatus.NOT_FOUND,
      );
    }

    const post: IPost = (await this.postsRepository.findOne({ id })) as IPost;

    if (!post?.id) {
      throw new HttpException(
        Utilities.getHttpResponse(`Post with id ${id} not found!`),
        HttpStatus.NOT_FOUND,
      );
    }

    wrap(post).assign(postDTO as any);
    await this.em.flush();
    await this.em.refresh(post);

    this.eventEmitter.emit('post.updated', new GenericPostEvent(post.id));

    return post;
  }

  async deletePost(id: string): Promise<IPost> {
    const post = await this.postsRepository.findOne({ id });

    if (!post?.id) {
      throw new HttpException(
        Utilities.getHttpResponse(`Post with id ${id} not found!`),
        HttpStatus.NOT_FOUND,
      );
    }

    const deleted = await this.postsRepository.nativeDelete({ id });

    if (deleted < 0) {
      throw new HttpException(
        Utilities.getHttpResponse(
          `Error occurred. Post with id ${id} not deleted!`,
        ),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.eventEmitter.emit('post.deleted', new GenericPostEvent(post.id));

    return post;
  }
}
