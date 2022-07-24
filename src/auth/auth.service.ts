import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/users/models/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({
      email,
    });

    if (user && (await user.validatePassword(pass))) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        privateKey: process.env.JWT_SECRET,
      }),
    };
  }
}
