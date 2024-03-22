import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDTO, UserUpdateDTO } from './users.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'class-validator';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return userCreated;
  }

  async findUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findMyUser(token: string) {
    const userDecoded = await this.jwtService.decode(token);

    const user = await this.prisma.user.findFirst({
      where: {
        id: userDecoded.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateUser(token: string, data: UserUpdateDTO) {
    const userDecoded = await this.jwtService.decode(token);

    await this.verifyExtraFields(data);

    const userUpdated = await this.prisma.user.update({
      where: {
        id: userDecoded.id,
      },
      data: {
        ...data,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return userUpdated;
  }

  async verifyExtraFields(body: UserUpdateDTO) {
    const allowedFields = UserUpdateDTO.getAllowedFields()
    const receivedFields = Object.keys(body);
    const extraFields = receivedFields.filter(
      (field) => !allowedFields.includes(field),
    );

    if (extraFields.length > 0) {
      throw new HttpException(
        `Invalid field(s) provided: ${extraFields.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
