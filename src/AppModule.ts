import { CommonModule } from '@fuks-ru/common-backend';
import { Module } from '@nestjs/common';
import { ConfigGetter } from 'app/Config/services/ConfigGetter';
import { ConfigModule } from 'app/Config/ConfigModule';
import { MinioModule } from 'app/Minio/MinioModule';
import { NestMinioModule } from 'nestjs-minio';
import { AuthModule } from '@fuks-ru/auth-module';

@Module({
  imports: [
    ConfigModule,
    CommonModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => ({
        sessionCookieDomain: configGetter.getCookieDomain(),
        apiPrefix: '/',
      }),
    }),
    AuthModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => ({
        authUrl: configGetter.getAuthBackendDomainWithScheme(),
      }),
    }),
    NestMinioModule.registerAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => configGetter.getMinioConfig(),
    }),
    MinioModule,
  ],
})
export class AppModule {}
