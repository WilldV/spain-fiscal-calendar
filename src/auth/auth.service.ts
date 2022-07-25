import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RedisClientType } from 'redis';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({
      email,
    });

    if (user && (await user.validatePassword(pass))) {
      return {
        _id: user._id.toString(),
        role: user.role,
        email: user.email,
      };
    }

    throw new UnauthorizedException();
  }

  async generateTokens(user: Partial<User>) {
    const accessPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(accessPayload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      privateKey: process.env.JWT_SECRET,
    });

    const refreshPayload = {
      id: user._id,
    };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      privateKey: process.env.JWT_REFRESH_SECRET,
    });

    await this.redis.set(refreshPayload.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);

    return this.generateTokens(user);
  }

  async refresh(refreshToken: string) {
    let decoded;

    try {
      decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }

    const redisToken = await this.redis.get(decoded.id);

    if (redisToken != refreshToken) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findById(decoded.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateTokens({
      _id: user._id.toString(),
      role: user.role,
      email: user.email,
    });
  }
}
