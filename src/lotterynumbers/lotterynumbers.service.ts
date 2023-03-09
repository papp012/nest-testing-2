import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLotteryNumbersDto } from './dto/create-lotterynumbers.dto';
import { LotteryNumbers, LotteryNumbersDocument } from './schemas/lotterynumbers.schema';

@Injectable()
export class LotteryNumbersService {
  constructor(
    @InjectModel(LotteryNumbers.name) private readonly lotteryNumbersModel: Model<LotteryNumbers>,
  ) {}

  async create(createLotteryNumbersDto: CreateLotteryNumbersDto): Promise<LotteryNumbers> {
    const createdLotteryNumbers = await this.lotteryNumbersModel.create(createLotteryNumbersDto);
    return createdLotteryNumbers;
  }

  async findAll(): Promise<LotteryNumbers[]> {
    return this.lotteryNumbersModel.find().exec();
  }

  async findOne(id: string): Promise<LotteryNumbers> {
    return this.lotteryNumbersModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedLotteryNumbers = await this.lotteryNumbersModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedLotteryNumbers;
  }
}
