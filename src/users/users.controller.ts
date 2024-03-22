import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserUpdateDTO } from './users.dto';
import { JwtAuthGuard } from 'src/auth/jwt..guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() userDTO: UserDTO) {
    return this.usersService.registerUser(userDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  findMany(): any {
    return this.usersService.findUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async findOne(@Req() request) {
    const token = request.headers.authorization.split(' ')[1];
    return this.usersService.findMyUser(token);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async update(@Req() request, @Body() data: UserUpdateDTO) {
    const token = request.headers.authorization.split(' ')[1];
    return this.usersService.updateUser(token, data);
  }
}
