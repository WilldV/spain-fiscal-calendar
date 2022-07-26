import { SkipAuth } from '@common/decorators/skip-auth.decorator';
import { MessageOutput } from '@common/dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, LoginOutput } from './dto';

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
  async refresh(@Args('refreshToken') refreshToken: string) {
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
