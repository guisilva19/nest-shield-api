import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() userDTO: UserDTO) {
    return this.usersService.registerUser(userDTO);
  }

  @Get()
  find(): any {
    return this.usersService.findUser();
  }
}
