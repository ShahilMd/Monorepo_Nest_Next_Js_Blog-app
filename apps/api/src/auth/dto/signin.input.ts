import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class signInInput{
    @Field()
    email: string;

    @Field()
    password: string;
}