import { Module } from '@nestjs/common';
import { MinioController } from 'app/Minio/controllers/MinioController';
import { MinioService } from 'app/Minio/servives/MinioService';

@Module({
  providers: [MinioService],
  controllers: [MinioController],
})
export class MinioModule {}
