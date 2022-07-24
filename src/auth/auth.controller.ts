import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { SkipAuth } from '@common/decorators/skip-auth.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('test-token')
  testToken(@Request() req) {
    return req.user;
  }

  @SkipAuth()
  @Get('test-skip-auth')
  testSkipAuth() {
    return {
      message: 'Ok!',
    };
  }
}
