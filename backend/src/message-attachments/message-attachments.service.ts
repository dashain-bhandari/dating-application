import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageAttachmentsModule } from './message-attachments.module';
import { MessageAttachment } from './message-attachments.entity';
import { Repository } from 'typeorm';
import { Attachment } from 'src/utils/types';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class MessageAttachmentsService {
  constructor(
    @InjectRepository(MessageAttachment)
    private readonly attachmentRepository: Repository<MessageAttachment>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(attachments: Attachment[]) {
  try {
    const promise = attachments.map(async (attachment) => {
      console.log(attachment)
      const response=await this.cloudinaryService.uploadImage(attachment);
      console.log(response)
      const newAttachment = this.attachmentRepository.create({
        fileName: attachment.filename,
        url:response.url,
        originalFileName: attachment.originalname,
        path: attachment.path,
      });
      console.log(newAttachment);
      return this.attachmentRepository.save(newAttachment);
    });

    return Promise.all(promise);
  } catch (error) {
    console.log(error.message)
  }
  }
}
