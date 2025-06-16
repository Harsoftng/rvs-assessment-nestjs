import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RedisService } from '../../database/redis.service';
import { GenericPostEvent } from '../events/post.event';

@Injectable()
export class PostListener {
  constructor(private readonly redis: RedisService) {}

  @OnEvent('post.created')
  async onPostCreated(event: GenericPostEvent): Promise<void> {
    await this.evictCacheItems(event, false);
  }

  @OnEvent('post.updated')
  async onPostUpdated(event: GenericPostEvent): Promise<void> {
    await this.evictCacheItems(event);
  }

  @OnEvent('post.deleted')
  async onPostDeleted(event: GenericPostEvent): Promise<void> {
    await this.evictCacheItems(event);
  }

  private async evictCacheItems(
    event: GenericPostEvent,
    evictPostRecord: boolean = true,
  ): Promise<void> {
    if (event.id) {
      await this.redis.forget(`posts`);

      if (evictPostRecord) {
        await this.redis.forget(`post:${event.id}`);
      }
    }
  }
}
