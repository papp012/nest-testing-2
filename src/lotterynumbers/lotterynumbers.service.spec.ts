import { Test, TestingModule } from '@nestjs/testing';
import { LotteryNumbersService } from './lotterynumbers.service';
import { getModelToken } from '@nestjs/mongoose';
import { LotteryNumbers } from './schemas/lotterynumbers.schema';
import { Model } from 'mongoose';

const mockLotteryNumbers = {
  winningNumbers: [1,2,3,4,5],
};

describe('LotteryNumbersService', () => {
  let service: LotteryNumbersService;
  let model: Model<LotteryNumbers>;

  const lotteryNumbersArray = [
    {
      winningNumbers: [1,2,3,4,5],
    },
    {
      winningNumbers: [2,3,4,5,6],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LotteryNumbersService,
        {
          provide: getModelToken('LotteryNumbers'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockLotteryNumbers),
            constructor: jest.fn().mockResolvedValue(mockLotteryNumbers),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LotteryNumbersService>(LotteryNumbersService);
    model = module.get<Model<LotteryNumbers>>(getModelToken('LotteryNumbers'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cats', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(lotteryNumbersArray),
    } as any);
    const cats = await service.findAll();
    expect(cats).toEqual(lotteryNumbersArray);
  });

  it('should insert a new cat', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        winningNumbers: [1,2,3,4,5],
      }),
    );
    const newCat = await service.create({
      winningNumbers: [1,2,3,4,5],
    });
    expect(newCat).toEqual(mockLotteryNumbers);
  });
});
