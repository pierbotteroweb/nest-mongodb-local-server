import { Test, TestingModule } from '@nestjs/testing';
import { AtracaoDeTvService } from './atracao-de-tv.service';

describe('AtracaoDeTvService', () => {
  let service: AtracaoDeTvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtracaoDeTvService],
    }).compile();

    service = module.get<AtracaoDeTvService>(AtracaoDeTvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
