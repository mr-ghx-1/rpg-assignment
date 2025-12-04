import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user.entity';

@InputType()
export class AuthInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@ObjectType()
export class AuthResponse {
    @Field()
    accessToken: string;

    @Field(() => User)
    user: User;
}
