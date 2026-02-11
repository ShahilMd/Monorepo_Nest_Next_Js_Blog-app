import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService, PrismaService,UserService,JwtStrategy],
  imports: [JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>("JWT_SECRET"),
      signOptions: {
        expiresIn: configService.get<string>("JWT_EXPIRES_IN") || '24h',
      }
    }) as JwtModuleOptions
  })]
})
export class AuthModule {}
