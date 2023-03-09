import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LotteryNumbersController } from './lotterynumbers.controller';
import { LotteryNumbersService } from './lotterynumbers.service';
import { LotteryNumbers, LotteryNumbersSchema } from './schemas/lotterynumbers.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: LotteryNumbers.name, schema: LotteryNumbersSchema }])],
  controllers: [LotteryNumbersController],
  providers: [LotteryNumbersService],
})
export class LotteryNumbersModule {}
