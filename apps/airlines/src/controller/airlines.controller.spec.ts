import { Test, TestingModule } from '@nestjs/testing';
import { AirlinesController } from './airlines.controller';
import { AirlinesService } from '../service/airlines.service';

describe('AirlinesController', () => {
  let airlinesController: AirlinesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AirlinesController],
      providers: [AirlinesService],
    }).compile();

    airlinesController = app.get<AirlinesController>(AirlinesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(airlinesController.getHello()).toBe('Hello World!');
    });
  });
});
