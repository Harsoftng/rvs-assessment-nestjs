import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PostFactory } from '../posts/factories/post.factory';

export class PostSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await new PostFactory(em).create(10);
  }
}
