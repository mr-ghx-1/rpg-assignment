import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { AuthInput, AuthResponse } from './dto/auth.dto';
import { User } from './user.entity';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Mutation(() => AuthResponse)
    signup(@Args('authInput') authInput: AuthInput) {
        return this.usersService.signup(authInput);
    }

    @Mutation(() => AuthResponse)
    login(@Args('authInput') authInput: AuthInput) {
        return this.usersService.login(authInput);
    }
}
