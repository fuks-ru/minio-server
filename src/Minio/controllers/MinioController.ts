import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IUploadResponse } from 'app/Minio/dto/IUploadResponse';
import { Roles } from '@fuks-ru/auth-module';
import { MinioService } from 'app/Minio/servives/MinioService';

@Controller()
export class MinioController {
  public constructor(private readonly minioService: MinioService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @Roles('admin', 'moderator')
  public async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IUploadResponse> {
    return this.minioService.upload(file);
  }
}
