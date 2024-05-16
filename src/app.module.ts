import { Module } from '@nestjs/common';
import { RateModule } from './rate/rate.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    RateModule, EmailModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
