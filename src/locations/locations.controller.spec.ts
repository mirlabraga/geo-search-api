import { Test, TestingModule } from '@nestjs/testing';
import { GeoLocation } from '../entity/location.entity';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('LocationsController', () => {
  let controller: LocationsController;
  let repo: Repository<GeoLocation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [LocationsService, {
        provide: getRepositoryToken(GeoLocation),
        useClass: Repository,
      }],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
    repo = module.get<Repository<GeoLocation>>(getRepositoryToken(GeoLocation));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('considering as search NOT return any value', async () => {

    try{
      await controller.findByFilter("");
    } catch (error) {
      expect(error.response).toStrictEqual("Incomplete location information");
    }
  });
});
