import { EnvGetter } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { NestMinioOptions } from 'nestjs-minio';

@Injectable()
export class ConfigGetter {
  public constructor(private readonly envGetter: EnvGetter) {}

  public getApiPort(): number {
    return 2_000;
  }

  public getCookieDomain(): string {
    return this.envGetter.isDev()
      ? 'localhost'
      : `.${this.envGetter.getEnv('DOMAIN')}`;
  }

  public getBucketName(): string {
    return this.envGetter.isDev()
      ? 'dev-bucket'
      : this.envGetter.getEnv('BUCKET_NAME');
  }

  public getMinioConfig(): NestMinioOptions {
    return this.envGetter.isDev()
      ? {
          endPoint: 'localhost',
          port: 9_000,
          useSSL: false,
          accessKey: 'minioadmin',
          secretKey: 'minioadmin',
        }
      : {
          endPoint: 'minio',
          port: 9_000,
          useSSL: false,
          accessKey: this.envGetter.getEnv('MINIO_USER'),
          secretKey: this.envGetter.getEnv('MINIO_PASSWORD'),
        };
  }

  public getAuthBackendDomainWithScheme(): string {
    return this.envGetter.isDev()
      ? 'http://localhost:3003'
      : `https://auth.${this.envGetter.getEnv('DOMAIN')}`;
  }
}
