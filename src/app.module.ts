import { Module } from '@nestjs/common';
import { RateModule } from './rate/rate.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    RateModule, EmailModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    CacheModule.register({ isGlobal: true })
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
