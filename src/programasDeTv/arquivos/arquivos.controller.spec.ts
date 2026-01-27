import { Test, TestingModule } from '@nestjs/testing';
import { ArquivosController } from './arquivos.controller';

describe('ArquivosController', () => {
  let controller: ArquivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArquivosController],
    }).compile();

    controller = module.get<ArquivosController>(ArquivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
