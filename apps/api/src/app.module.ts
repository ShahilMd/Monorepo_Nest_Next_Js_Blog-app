import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { TagsModule } from './tags/tags.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    PrismaModule, 
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(),"src/graphql/schema.gql")
  }), 
  PostModule, UserModule, CommentModule, TagsModule, LikesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
