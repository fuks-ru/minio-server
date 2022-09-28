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
    return this.envGetter.isDev() ? 'localhost' : 'fuks.ru';
  }

  public getMinioConfig(): NestMinioOptions {
    return {
      endPoint: 'localhost',
      port: 9_000,
      useSSL: false,
      accessKey: 'minio99',
      secretKey: 'minio123',
    };
  }
}
