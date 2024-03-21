import { Injectable } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async registerUser(userBody: UserDTO) {
    const userCreated = await this.prisma.user.create({
      data: userBody,
    });

    return userCreated;
  }

  async findUser() {
    return this.prisma.user.findMany();
  }
}
