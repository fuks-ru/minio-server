import { Logger } from '@fuks-ru/common-backend';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'app/AppModule';
import { ConfigGetter } from 'app/Config/services/ConfigGetter';
import { MinioService } from 'app/Minio/servives/MinioService';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: (requestOrigin, callback) => {
        callback(null, requestOrigin);
      },
      credentials: true,
    },
    bufferLogs: true,
  });

  const configGetter = app.get(ConfigGetter);
  const minioService = app.get(MinioService);
  const appLogger = app.get(Logger);

  await minioService.createDefaultBucketIfNotExists();

  app.useLogger(appLogger);

  await app.listen(configGetter.getApiPort());
})();
