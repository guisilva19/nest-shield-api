import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './auth.constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const comparePasswordHashed = bcrypt.compareSync(pass, user.password);

    if (user && comparePasswordHashed) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException();
    }
  }

  async auth({ email, password }: { email: string; password: string }) {
    const user = await this.validateUser(email, password);
    return {
      access_token: this.jwtService.sign(user, {
        secret: jwtConstants.secret,
        expiresIn: '24h',
      }),
    };
  }

}
