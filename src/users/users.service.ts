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
    return this.prisma.user.findMany();
  }
}
