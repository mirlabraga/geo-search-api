import { Test, TestingModule } from '@nestjs/testing';
import { LOCATIONS } from './locations.mock';
import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  let service: LocationsService;
  let locationsExpect;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsService],
    }).compile();
    locationsExpect = LOCATIONS;

    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('considering as search with the name is hastin', async () => {

    const locationsResult = await service.getLocations("hastin");
    expect(locationsResult.length).toStrictEqual(13);
    expect(locationsResult[0]).toStrictEqual(locationsExpect[0]);
  });

  it('considering as search NOT return any value', async () => {

    try{
      await service.getLocations("TEST")
    } catch (error) {
      expect(error.message).toEqual("cannot find locations");
    }
  });
});
