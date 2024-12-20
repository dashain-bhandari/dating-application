import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  Req,
  UploadedFile,
  UseGuards,
  UploadedFiles,
  NotFoundException,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('photo')
@ApiTags('photo')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly userService: UsersService,
    private readonly cloudinaryService:CloudinaryService
  ) {}

  // @Post('upload/multiple')
  // @UseGuards(JwtAuthenticationGuard)
  // @UseInterceptors(
  //   FileFieldsInterceptor(
  //     [
  //       { name: 'picture1', maxCount: 1 },
  //       { name: 'picture2', maxCount: 1 },
  //       { name: 'picture3', maxCount: 1 },
  //       { name: 'picture4', maxCount: 1 },
  //       { name: 'picture5', maxCount: 1 },
  //     ],
  //     {
  //       storage: diskStorage({
  //         destination: './uploadedFiles/avatars',
  //       }),
  //     },
  //   ),
  // )
  // async uploadPhoto(
  //   @Req() request: RequestWithUser,
  //   @UploadedFiles()
  //   files: {
  //     picture1?: Express.Multer.File[];
  //     picture2?: Express.Multer.File[];
  //     picture3?: Express.Multer.File[];
  //     picture4?: Express.Multer.File[];
  //     picture5?: Express.Multer.File[];
  //   },
  // ) {
  //   return this.photosService.uploadPhoto(request.user.id);
  // }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getPhotos(@Req() request: RequestWithUser) {
    return await this.photosService.getPhotosByUserId(request.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deletePhotos(@Param('id') id: string, @Req() request: RequestWithUser) {
    const user = await this.userService.getById(request.user.id);
    if (!user) {
      throw new NotFoundException();
    }

    return await this.photosService.deletePhoto(id, request.user.id);
  }

//   @Post('/upload')
//   @UseGuards(JwtAuthenticationGuard)
//   @UseInterceptors(
//     FileFieldsInterceptor([{ name: 'photos', maxCount: 20 }], {
//       storage: diskStorage({
//         destination: './uploadedFiles/photos',
//         filename: (req, file, cb) => {
//           const uniqueSuffix =
//             Date.now() + '-' + Math.round(Math.random() * 1e9);
//           const fileExtension = extname(file.originalname);
//           cb(null, `${uniqueSuffix}${fileExtension}`);
//         },
//       }),
//     }),
//   )
//   async uploadPhotos(
//     @UploadedFiles() files: Record<string, Express.Multer.File[]>,
//     @Req() request: RequestWithUser,
//   ) {
//     const user = await this.userService.getById(request.user.id);
//     if (!user) {
//       throw new NotFoundException();
//     }
//     console.log(files.photos);
//     const uploadedPhotos = await Promise.all(
//       files.photos.map(async (file) => {
//         // const fileName = uuidv4() + extname(file.originalname);
//         // console.log(file.originalname);
//         console.log(file);
//         const photo = await this.photosService.uploadPhoto({
//           fileName: file.filename,
//           originalFileName: file.originalname,
//           path: file.path,
//           user,
//         });
//         return photo;
//       }),
//     );
//     return uploadedPhotos;
//   }
// }


@Post('/upload')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos', maxCount: 20 }]),
  )
  async uploadPhotos(
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
    @Req() request: RequestWithUser,
  ) {
    const user = await this.userService.getById(request.user.id);
    if (!user) {
      throw new NotFoundException();
    }
    console.log(files.photos);
    const uploadedPhotos = await Promise.all(
      files.photos.map(async (file) => {
        // const fileName = uuidv4() + extname(file.originalname);
        // console.log(file.originalname);
        console.log(file);
        const response =await this.cloudinaryService.uploadImage(file);
        console.log(response.url);

        const photo = await this.photosService.uploadPhoto({
          url: response.url,
          user,
        });
        return photo;
      }),
    );
    return uploadedPhotos;
  }


}