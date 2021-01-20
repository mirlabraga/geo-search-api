import {  HttpException, Injectable } from '@nestjs/common';
import { LOCATIONS } from './locations.mock';

@Injectable()
export class LocationsService {
  locations = LOCATIONS;

  getLocations(locationName: string): Promise<string[]> {
    return new Promise((resolve) => {
      const location = this.locations.filter(location => location.toLowerCase().includes(locationName.toLowerCase()));
      if (location !==undefined && location.length > 0) {
        resolve(location);
      } else {
        throw new HttpException('cannot find locations', 404);
      }
    });
  }
}
