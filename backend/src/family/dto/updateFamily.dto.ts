import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNotEmpty,
} from 'class-validator';

export default class UpdateFamilyDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  familyType: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  noOfSiblings: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  noOfFamilyMember: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  noOfUnmarried: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  liveWithFamily: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  familyValues: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  gotra: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  parentStatus: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  familyAddress: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  nativePlace: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  motherTongue: string;
}
