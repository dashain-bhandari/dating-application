import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import User from 'src/users/user.entity';

export class CreateOrderDto {
  @IsNumber()
  package: number;

  @IsNumber()
  price: number;
}
