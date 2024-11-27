import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GoogleDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;


}

export default GoogleDto;
