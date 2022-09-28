import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';
import { v4 } from 'uuid';
import { IUploadResponse } from 'app/Minio/dto/IUploadResponse';

@Controller()
export class MinioController {
  public constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient: Client,
  ) {}

  // TODO защищать гвардом
  @Post('/upload/:bucket')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(
    @UploadedFile() file: Express.Multer.File,
    @Param('bucket') bucket: string,
  ): Promise<IUploadResponse> {
    if (!(await this.minioClient.bucketExists(bucket))) {
      await this.minioClient.makeBucket(bucket, 'eu-west-1');
    }

    const fileName = `${v4()}-${file.originalname}`;

    await this.minioClient.putObject(bucket, fileName, file.buffer);

    return {
      name: fileName,
    };
  }

  @Get('/static/:bucket/:fileName')
  public async static(
    @Param('bucket') bucket: string,
    @Param('fileName') fileName: string,
  ): Promise<StreamableFile> {
    const result = await this.minioClient.getObject(bucket, fileName);

    return new StreamableFile(result);
  }
}
