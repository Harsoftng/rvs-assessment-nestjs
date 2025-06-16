import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from '../database/database.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from './entities/post.entity';
import { PostListener } from './listeners/post.listener';

@Module({
  imports: [
    DatabaseModule,
    MikroOrmModule.forFeature({
      entities: [Post],
    }),
  ],
  providers: [PostsService, PostListener],
  controllers: [PostsController],
})
export class PostsModule {}
