import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { signInInput } from './dto/signin.input';
import { AuthPayload } from './entities/auth-payload.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signIn(@Args("signInInput") signInInput:signInInput){
    
    const user = await this.authService.validateLocalUser(signInInput);

    return await this.authService.login(user)
  }
}
