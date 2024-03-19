import { Injectable } from '@nestjs/common';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
  registerUser(userBody: UserDTO) {
    return userBody;
  }

  findUser(): { user_id: number; name: string } {
    return { user_id: 1, name: 'Guilherme Silva Fernandes' };
  }
}
