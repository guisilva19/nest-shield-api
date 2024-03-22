import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';
import { JwtAuthGuard } from 'src/auth/jwt..guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  register(@Body() userDTO: UserDTO) {
    return this.usersService.registerUser(userDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  find(): any {
    return this.usersService.findUser();
  }

}
