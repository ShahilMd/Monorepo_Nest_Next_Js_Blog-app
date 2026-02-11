import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2';

@Injectable()
export class UserService {
  constructor( private prisma: PrismaService){}

  async create(createUserInput: CreateUserInput) {
    const {name,email,password} = createUserInput;

    const isExist = await this.findOne(email)

    if(isExist) throw new ConflictException("User Already exist")

    const hashPassword = await hash(password)

    return await this.prisma.user.create({
      data: {
        password: hashPassword,
        name,
        email
      }
    })
  }


  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findUnique({where:{email}})
    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
