import { EnvGetter } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { NestMinioOptions } from 'nestjs-minio';

@Injectable()
export class ConfigGetter {
  public constructor(private readonly envGetter: EnvGetter) {}

  public getApiPort(): number {
    return 2_000;
  }

  public getDomain(): string {
    return this.envGetter.isDev()
      ? 'localhost'
      : this.envGetter.getEnv('DOMAIN');
  }

  public getApiPrefix(): string {
    return '/static';
  }

  public getMinioConfig(): NestMinioOptions {
    return this.envGetter.isDev()
      ? {
          endPoint: 'localhost',
          port: 9_000,
          useSSL: false,
          accessKey: 'user123',
          secretKey: 'secret123',
        }
      : {
          endPoint: this.envGetter.getEnv('MINIO_HOST'),
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
