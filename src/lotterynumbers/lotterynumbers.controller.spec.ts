import { Test, TestingModule } from '@nestjs/testing';
import { LotteryNumbersController } from './lotterynumbers.controller';
import { CreateLotteryNumbersDto } from './dto/create-lotterynumbers.dto';
import { LotteryNumbersService } from './lotterynumbers.service';

describe('LotteryNumbers Controller', () => {
  let controller: LotteryNumbersController;
  let service: LotteryNumbersService;
  const createLotteryNumbersDto: CreateLotteryNumbersDto = {
    winningNumbers: [1,2,3,4,5],
  };

  const mockLotteryNumbers = {
    winningNumbers: [1,2,3,4,5],
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LotteryNumbersController],
      providers: [
        {
          provide: LotteryNumbersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                winningNumbers: [1,2,3,4,5],
              },
              {
                winningNumbers: [2,3,4,5,6],
              },
              {
                winningNumbers: [3,4,5,6,7],
              },
            ]),
            create: jest.fn().mockResolvedValue(createLotteryNumbersDto),
          },
        },
      ],
    }).compile();

    controller = module.get<LotteryNumbersController>(LotteryNumbersController);
    service = module.get<LotteryNumbersService>(LotteryNumbersService);
  });

  describe('create()', () => {
    it('should create a new cat', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockLotteryNumbers);

      await controller.create(createLotteryNumbersDto);
      expect(createSpy).toHaveBeenCalledWith(createLotteryNumbersDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of cats', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          winningNumbers: [1,2,3,4,5],
        },
        {
          winningNumbers: [2,3,4,5,6],
        },
        {
          winningNumbers: [3,4,5,6,7],
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
