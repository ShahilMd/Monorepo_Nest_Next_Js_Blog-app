import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class User {

  @Field(() => Int)
  id :number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({nullable: true})
  bio: string;

  @Field({nullable: true})
  avatar: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Post])
  posts: Post[]

  @Field(() => [Comment])
  comments: Comment[]

  @Field(() => [Like])
  likes: Like[]
}
