import { Inject, Injectable, Logger } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';
import { v4 } from 'uuid';
import { IUploadResponse } from 'app/Minio/dto/IUploadResponse';
import { ConfigGetter } from 'app/Config/services/ConfigGetter';

@Injectable()
export class MinioService {
  private readonly defaultBucket: string;

  private readonly logger = new Logger(MinioService.name);

  public constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient: Client,
    configGetter: ConfigGetter,
  ) {
    this.defaultBucket = configGetter.getBucketName();
  }

  public async createDefaultBucketIfNotExists(): Promise<void> {
    if (!(await this.minioClient.bucketExists(this.defaultBucket))) {
      await this.minioClient.makeBucket(this.defaultBucket, 'eu-west-1');
      await this.setReadonlyPolicy();

      this.logger.warn('Bucket does not exists. Created');

      return;
    }

    await this.setReadonlyPolicy();

    this.logger.log('Bucket exist.');
  }

  public async upload(file: Express.Multer.File): Promise<IUploadResponse> {
    const fileName = `${v4()}-${file.originalname}`;

    await this.minioClient.putObject(
      this.defaultBucket,
      fileName,
      file.buffer,
      {
        'Content-type': file.mimetype,
      },
    );

    return {
      name: fileName,
    };
  }

  private async setReadonlyPolicy(): Promise<void> {
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Action: ['s3:GetObject'],
          Effect: 'Allow',
          Principal: {
            AWS: ['*'],
          },
          Resource: [`arn:aws:s3:::${this.defaultBucket}/*`],
          Sid: '',
        },
      ],
    };

    await this.minioClient.setBucketPolicy(
      this.defaultBucket,
      JSON.stringify(policy),
    );
  }
}
