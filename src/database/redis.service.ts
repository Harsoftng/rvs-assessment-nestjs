import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | null> {
    return await this.cacheManager.get<T>(key);
  }

  async remember<T>(key: string, callback: () => Promise<T>): Promise<T> {
    let cached: T | null = await this.get<T>(key);

    if (cached) {
      return cached;
    }

    cached = await callback();
    if (cached) {
      await this.set(key, cached);
    }

    return cached;
  }

  async set<T>(key: string, value: T): Promise<T> {
    return await this.cacheManager.set<T>(key, value);
  }

  async forget(key: string): Promise<boolean> {
    return await this.cacheManager.del(key);
  }

  async clear(): Promise<boolean> {
    return await this.cacheManager.clear();
  }
}
