import { Test, TestingModule } from '@nestjs/testing';
import { ArquivoService } from './arquivo.service';

describe('ArquivoService', () => {
  let service: ArquivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArquivoService],
    }).compile();

    service = module.get<ArquivoService>(ArquivoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
