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
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule, 
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(),"src/graphql/schema.gql"),
    context: ({req}) => ({req})
  }), 
  ConfigModule.forRoot({
    isGlobal:true
  }),
  PostModule, UserModule, CommentModule, TagsModule, LikesModule, AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
