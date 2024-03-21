import { Injectable } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  registerUser(userBody: UserDTO) {
    return userBody;
  }

  async findUser() {
    await this.prisma.user.create({
      data: {
        name: 'Guilherme Silva Fernandes',
        email: '2003silvagui@gmail.com',
        password: '123456',
      },
    });
    return this.prisma.user.findMany();
  }
}
