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
    return 'localhost';
  }

  public getMinioConfig(): NestMinioOptions {
    return {
      endPoint: 'localhost',
      port: 9_000,
      useSSL: false,
      accessKey: 'user123',
      secretKey: 'secret123',
    };
  }

  public getAuthBackendDomainWithScheme(): string {
    return 'http://localhost:3003'
  }
}
