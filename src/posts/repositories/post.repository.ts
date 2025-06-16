import { EntityRepository } from '@mikro-orm/core';
import { Post } from '../entities/post.entity';

export class PostRepository extends EntityRepository<Post> {}
