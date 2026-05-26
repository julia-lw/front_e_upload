import { Test, TestingModule } from '@nestjs/testing';
import { ArquivoController } from './arquivo.controller';
import { ArquivoService } from './arquivo.service';

describe('ArquivoController', () => {
  let controller: ArquivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArquivoController],
      providers: [ArquivoService],
    }).compile();

    controller = module.get<ArquivoController>(ArquivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
