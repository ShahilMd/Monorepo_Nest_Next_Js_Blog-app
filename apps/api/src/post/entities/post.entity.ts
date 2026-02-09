import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field({nullable: true})
  slug?: string;

  @Field()
  title: string;

  @Field()
  content: string

  @Field({nullable: true})
  thumbnail?: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => User)
  author: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Tag])
  tags: Tag[]

  @Field(() => [Comment])
  comments: Comment
}
