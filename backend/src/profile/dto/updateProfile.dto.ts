import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
  isString,
} from 'class-validator';

export class updateProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  height: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sex: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  religion: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  profileCreatedFor: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  caste: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  subcaste: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  gotra: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  martial_status: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  day: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  month: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  physicalDisability: string;
}
