import { Injectable, OnModuleInit } from '@nestjs/common';
import {PrismaClient} from "@prisma/client";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as dotenv from 'dotenv';


dotenv.config(); 

@Injectable()
export class PrismaService 
    extends PrismaClient 
    implements OnModuleInit 
{
    constructor(){
        const connectionString = process.env.DATABASE_URL as string;
        const adapter = new PrismaBetterSqlite3({
            url: connectionString,
        });

        super({ adapter });
    }
    async onModuleInit() {
       await this.$connect();
    }
}
