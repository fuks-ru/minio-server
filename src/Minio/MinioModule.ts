import { Module } from '@nestjs/common';
import { MinioController } from 'app/Minio/controllers/MinioController';

@Module({
  controllers: [MinioController],
})
export class MinioModule {}
