import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LotteryNumbersService } from './lotterynumbers.service';
import { CreateLotteryNumbersDto } from './dto/create-lotterynumbers.dto';
import { LotteryNumbers } from './schemas/lotterynumbers.schema';

@Controller('lotterynumbers')
export class LotteryNumbersController {
  constructor(private readonly lotteryNumbersService: LotteryNumbersService) {}

  @Post()
  async create(@Body() createLotteryNumbersDto: CreateLotteryNumbersDto) {
    await this.lotteryNumbersService.create(createLotteryNumbersDto);
  }

  @Get()
  async findAll(): Promise<LotteryNumbers[]> {
    return this.lotteryNumbersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LotteryNumbers> {
    return this.lotteryNumbersService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.lotteryNumbersService.delete(id);
  }
}
