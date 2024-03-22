import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, PrismaService, AuthService, JwtService],
  exports: [UsersService],
})
export class AppModule {}
