import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
    async uploadImage(
        fileName: Express.Multer.File,
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            v2.config({
                cloud_name: 'dffkr4nwm',
                api_key: '658273486474267',
                api_secret: '4h7VFYjxNSDjJf9AAzwqdoCtIvQ',
            });
            const upload = v2.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
            toStream(fileName.buffer).pipe(upload);
        });
    }
}