import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LotteryNumbersModule } from './lotterynumbers/lotterynumbers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    LotteryNumbersModule,
  ],
})
export class AppModule {}
