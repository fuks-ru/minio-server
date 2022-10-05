import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';
import { v4 } from 'uuid';
import { IUploadResponse } from 'app/Minio/dto/IUploadResponse';
import { Logger } from '@fuks-ru/common-backend';

@Injectable()
export class MinioService {
  private readonly defaultBucket = 'static';

  public constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient: Client,
    private readonly logger: Logger,
  ) {}

  public async createDefaultBucketIfNotExists(): Promise<void> {
    if (!(await this.minioClient.bucketExists(this.defaultBucket))) {
      await this.minioClient.makeBucket(this.defaultBucket, 'eu-west-1');

      this.logger.info('Bucket does not exist. Created');

      return;
    }

    this.logger.info('Bucket exist.');
  }

  public async upload(file: Express.Multer.File): Promise<IUploadResponse> {
    const fileName = `${v4()}-${file.originalname}`;

    await this.minioClient.putObject(this.defaultBucket, fileName, file.buffer);

    return {
      name: fileName,
    };
  }

  public async get(fileName: string): Promise<StreamableFile> {
    const result = await this.minioClient.getObject(
      this.defaultBucket,
      fileName,
    );

    return new StreamableFile(result);
  }
}
