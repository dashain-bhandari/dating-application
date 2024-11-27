import { Module } from '@nestjs/common';
import { MessageAttachmentsService } from './message-attachments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageAttachment } from './message-attachments.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageAttachment]),CloudinaryModule],
  providers: [MessageAttachmentsService],
  exports: [MessageAttachmentsService],
})
export class MessageAttachmentsModule {}
