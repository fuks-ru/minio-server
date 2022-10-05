import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IUploadResponse } from 'app/Minio/dto/IUploadResponse';
import { Public, Roles } from '@fuks-ru/auth-module';
import { MinioService } from 'app/Minio/servives/MinioService';

@Controller()
export class MinioController {
  private readonly defaultBucket = 'static';

  private readonly logger = new Logger(MinioController.name);

  public constructor(private readonly minioService: MinioService) {}

  @Get('/')
  @Public()
  public get() {

    this.logger.error('asdsd', new Error().stack);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @Roles('admin', 'moderator')
  public async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IUploadResponse> {
    return this.minioService.upload(file);
  }

  @Get('/static/:fileName')
  @Public()
  public async static(
    @Param('fileName') fileName: string,
  ): Promise<StreamableFile> {
    return this.minioService.get(fileName);
  }
}
