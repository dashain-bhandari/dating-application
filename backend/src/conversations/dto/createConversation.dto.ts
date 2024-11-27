import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  userId: string;


  @IsString()
  message: string;
}

export class DeleteConversationDto {
  
  userId: string;


}
