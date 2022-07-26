import { MessageOutput } from '@common/dto';
import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { RedisClientType } from 'redis';

@Resolver()
export class AppResolver {
  constructor(
    @InjectConnection() private connection: Connection,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
  ) {}

  @Query(() => MessageOutput)
  async testDbConnection() {
    await this.connection.collection('test').find().toArray();

    return {
      message: 'DB Connection is Ok!',
    };
  }

  @Query(() => MessageOutput)
  async testRedisConnection() {
    await this.redis.get('dummy');

    return {
      message: 'Redis Connection is Ok!',
    };
  }
}
