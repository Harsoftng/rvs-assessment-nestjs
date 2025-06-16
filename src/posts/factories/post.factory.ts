import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Post } from '../entities/post.entity';

export class PostFactory extends Factory<Post> {
  model = Post;

  definition(): Partial<Post> {
    return {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
    };
  }
}
