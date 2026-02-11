import { Injectable, UnauthorizedException } from '@nestjs/common';
import { signInInput } from './dto/signin.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth.jwtPayload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(private prisma:PrismaService,private user:UserService,private jwtService:JwtService){}

    async validateLocalUser({email,password}: signInInput){

        const user = await this.user.findOne(email)

        if(!user) throw new UnauthorizedException("User not found");

        const passwordMatched = await verify(user.password as string, password);

        if(!passwordMatched) throw new UnauthorizedException("Invalid Cradentials")

        return user;
    }

    async generateToken(userId:number){
        const payload:AuthJwtPayload = {sub: userId} 
        const accessToken = await this.jwtService.signAsync(payload);

        return accessToken;
    }

    async login(user:User){
        const accessToken =await this.generateToken(user.id);
        return {
            id:user.id,
            name:user.name,
            avatar:user.avatar,
            accessToken
        }
    }

    async validateJwtUser(userId:number){
        const user = await this.prisma.user.findUnique({
            where:{
                id:userId,
            }
        });

        if(!user) throw new UnauthorizedException("User not found")

        const currentUser = {id: user.id}

        return currentUser;
    }
}
