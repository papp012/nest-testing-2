import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LotteryNumbersDocument = HydratedDocument<LotteryNumbers>;

@Schema()
export class LotteryNumbers {
  @Prop()
  winningNumbers: number[];

  //@Prop()
  //age: number;

  //@Prop()
  //breed: string;
}

export const LotteryNumbersSchema = SchemaFactory.createForClass(LotteryNumbers);
