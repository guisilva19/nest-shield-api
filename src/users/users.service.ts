import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async registerUser(userBody: UserDTO) {
    const userAlreadyRegistered = await this.prisma.user.findFirst({
      where: {
        email: userBody.email,
      },
    });

    if (userAlreadyRegistered) {
      throw new UnauthorizedException();
    }

    const userCreated = await this.prisma.user.create({
      data: {
        ...userBody,
        password: bcrypt.hashSync(userBody.password, 10),
      },
    });

    return userCreated;
  }

  async findUser() {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
}
