import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeoLocation } from '../entity/location.entity';
import { LOCATIONS } from './locations.mock';
import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  let service: LocationsService;
  let locationsExpect;
  let repo: Repository<GeoLocation>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsService, {
        provide: getRepositoryToken(GeoLocation),
        useClass: Repository,
      }],
    }).compile();
    locationsExpect = LOCATIONS;

    service = module.get<LocationsService>(LocationsService);
    repo = module.get<Repository<GeoLocation>>(getRepositoryToken(GeoLocation));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('considering as search with the name is hastin', async () => {

    const geoLocations: GeoLocation[] = [{name:"Hastings Castle", id:1, geonameid:"1", latitude:"34.001", longitude:"24.344", country:"BR"},
    {name:"Hastings Ballygally Castle Hotel", id:1, geonameid:"2", latitude:"35.001", longitude:"21.344", country:"UK"}]

    const locationsExpect = [
      "Hastings Castle",
      "Hastings Ballygally Castle Hotel"]

    jest.spyOn(repo, 'find').mockResolvedValueOnce(geoLocations);

    const locationsResult = await service.getLocations("hastin");
    expect(locationsResult.length).toStrictEqual(2);
    expect(locationsResult).toEqual(locationsExpect);
    expect(locationsResult[0]).toEqual(locationsExpect[0]);
  });

  it('considering as search NOT return any value', async () => {

    jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

     try {
       await service.getLocations("TEST")
     } catch (error) {
       expect(error.message).toEqual("cannot find locations");
     }
   });
});
