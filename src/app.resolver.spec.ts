import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from './app.resolver';
import { REDIS_CLIENT } from './redis';

describe('AppResolver', () => {
  let resolver: AppResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppResolver,
        {
          provide: getConnectionToken('Database'),
          useValue: {},
        },
        {
          provide: REDIS_CLIENT,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<AppResolver>(AppResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
