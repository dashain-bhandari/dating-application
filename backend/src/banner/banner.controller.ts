import { Controller, Get, NotFoundException, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

import { BannerService } from './banner.service';

@Controller('banner')
export class BannerController {

    constructor(
     
        private readonly cloudinaryService:CloudinaryService,
        private readonly bannerService:BannerService
      ) {}
    
    @Post('/upload')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(
      FileFieldsInterceptor([{ name: 'banner', maxCount: 1}]),
    )
    async uploadPhotos(
      @UploadedFiles() files: Record<string, Express.Multer.File[]>,
      @Req() request: RequestWithUser,
    ) {
      
      console.log(files.banner);
      console.log("hii")
      const uploadedPhotos = await Promise.all(
        files.banner.map(async (file) => {
          // const fileName = uuidv4() + extname(file.originalname);
          // console.log(file.originalname);
          console.log(file);
          const response =await this.cloudinaryService.uploadImage(file);
          console.log(response.url);
  
          const photo = await this.bannerService.uploadPhoto({
            
            url: response.url,
            user:request?.user,
          });
          return photo;
        }),
      );
      return uploadedPhotos;
    }
  
    @Get()
    @UseGuards(JwtAuthenticationGuard)
    async getPhotos(@Req() request: RequestWithUser) {
      return await this.bannerService.getPhotosByUserId(request.user.id);
    }
}
