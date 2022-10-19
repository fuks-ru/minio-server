import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IUploadResponse } from 'app/Minio/dto/IUploadResponse';
import { Roles, RolesGuard } from '@fuks-ru/auth-module';
import { MinioService } from 'app/Minio/servives/MinioService';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class MinioController {
  public constructor(private readonly minioService: MinioService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @Roles('admin', 'moderator')
  @UseGuards(AuthGuard('auth-jwt'), RolesGuard)
  public async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IUploadResponse> {
    return this.minioService.upload(file);
  }
}
