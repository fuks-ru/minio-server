import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IUploadResponse } from 'app/Minio/dto/IUploadResponse';
import { Roles, RolesGuard, AuthJwtGuard } from '@fuks-ru/auth-module';
import { MinioService } from 'app/Minio/servives/MinioService';

@Controller()
export class MinioController {
  public constructor(private readonly minioService: MinioService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @Roles('admin', 'moderator')
  @UseGuards(AuthJwtGuard, RolesGuard)
  public async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IUploadResponse> {
    return this.minioService.upload(file);
  }
}
