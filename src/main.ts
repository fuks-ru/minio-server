import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'app/AppModule';
import { ConfigGetter } from 'app/Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: (requestOrigin, callback) => {
        callback(null, requestOrigin);
      },
    },
  });
  const configGetter = app.get(ConfigGetter);

  await app.listen(configGetter.getApiPort());
})();
