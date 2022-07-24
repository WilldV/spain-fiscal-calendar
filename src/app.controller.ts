import { Controller, Get, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { RedisClientType } from '@redis/client';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    @InjectConnection() private connection: Connection,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
  ) {}

  @Get('test-db')
  async testDbConnection() {
    await this.connection.collection('test').find().toArray();

    return {
      message: 'DB Connection is Ok!',
    };
  }

  @Get('test-redis')
  async testRedisConnection() {
    await this.redis.get('dummy');

    return {
      message: 'Redis Connection is Ok!',
    };
  }
}
