import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { IPost, IPostsResponse } from './types/post.interface';
import { CreatePostDto } from './dtos/create-post.dto';
import { EditPostDto } from './dtos/edit-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAllPosts(): Promise<IPostsResponse> {
    return this.postsService.findAllPosts();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findPost(@Param('id', ParseUUIDPipe) id: string): Promise<IPost> {
    return this.postsService.findPost(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() createPostDTO: CreatePostDto): Promise<IPost> {
    return await this.postsService.createPost(createPostDTO);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() editPostDTO: EditPostDto,
  ): Promise<IPost> {
    return this.postsService.updatePost(id, editPostDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param('id', ParseUUIDPipe) id: string): Promise<IPost> {
    return this.postsService.deletePost(id);
  }
}
