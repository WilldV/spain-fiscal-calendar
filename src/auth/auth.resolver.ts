import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SkipAuth, MessageOutput } from '../common';
import { AuthService } from './auth.service';
import { LoginInput, LoginOutput, RefreshTokenInput } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @Mutation(() => LoginOutput)
  async login(@Args() input: LoginInput) {
    return this.authService.login(input.email, input.password);
  }

  @SkipAuth()
  @Mutation(() => LoginOutput)
  async refresh(@Args() { refreshToken }: RefreshTokenInput) {
    return this.authService.refresh(refreshToken);
  }

  @Query(() => MessageOutput)
  async testToken() {
    return {
      message: 'Ok!',
    };
  }

  @SkipAuth()
  @Query(() => MessageOutput)
  async testSkipAuth() {
    return {
      message: 'Ok!',
    };
  }
}
