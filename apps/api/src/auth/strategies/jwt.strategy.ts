import {PassportStrategy} from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthJwtPayload } from "../types/auth.jwtPayload";
import { UserService } from "src/user/user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "../auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private configService: ConfigService, private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_SECRET") || "default-secret-key",
        });
    }

    async validate(payload: AuthJwtPayload) {

        const userId = payload.sub;

        return this.authService.validateJwtUser(userId)
    }
}