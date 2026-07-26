import { Test, TestingModule } from '@nestjs/testing';
import { AtracaoDeTvController } from './atracao-de-tv.controller';
import { AtracaoDeTvService } from './atracao-de-tv.service';

describe('AtracaoDeTvController', () => {
  let controller: AtracaoDeTvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtracaoDeTvController],
      providers: [AtracaoDeTvService],
    }).compile();

    controller = module.get<AtracaoDeTvController>(AtracaoDeTvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
