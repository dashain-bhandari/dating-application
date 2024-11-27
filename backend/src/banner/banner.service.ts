import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Banner from './banner.entity';
import { QueryRunner, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import User from 'src/users/user.entity';
import { deletePicture } from 'src/utils/deletePhotofromFile';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}


  async uploadPhoto(data: any) {
    
    const createPhoto = await this.bannerRepository.create(data);
    return await this.bannerRepository.save(createPhoto);
  }

  async getPhotosByUserId(userId: string) {
    const user = await this.bannerRepository.find({
      where: { user: { id: userId } },
    });
    return user;
  }


  async uploadUserBanner(file: any, queryRunner: QueryRunner, user: User) {
   try {
    const response=await this.cloudinaryService.uploadImage(file);
    const banner = queryRunner.manager.create(Banner, {
      fileName: file.filename,
      originalFileName: file.originalname,
      path: file.path,
      url:response.url,
      user,
    });
    console.log('we reached at banner');
    await queryRunner.manager.save(Banner, banner);
    return banner;
   } catch (error) {
    console.log(error.message)
   }
  }

  async deleteBannerWithQueryRunner(
    bannerId: string,
    queryRunner: QueryRunner,
  ) {
    const banner = await this.bannerRepository.findOne({
      where: { id: bannerId },
    });
    if (!banner) {
      throw new HttpException('Banner not found', HttpStatus.NOT_FOUND);
    }
    console.log(banner);
    deletePicture(banner.path);
    const deleteResponse = await queryRunner.manager.delete(Banner, bannerId);
    console.log(deleteResponse);
    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
  }
}
