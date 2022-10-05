import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IUploadResponse } from 'app/Minio/dto/IUploadResponse';
import { Public, Roles } from '@fuks-ru/auth-module';
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

  @Get('/files/:fileName')
  @Public()
  public async static(
    @Param('fileName') fileName: string,
  ): Promise<StreamableFile> {
    return this.minioService.get(fileName);
  }
}
