import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UserUpdateDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  static getAllowedFields(): string[] {
    return ['name', 'email'];
  }
}
