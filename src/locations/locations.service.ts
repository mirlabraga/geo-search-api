import { HttpException, Injectable } from '@nestjs/common';
import { LOCATIONS } from './locations.mock';

@Injectable()
export class LocationsService {
  locations = LOCATIONS;

  getLocations(locationName: string): Promise<any> {
    return new Promise(resolve => {
      const location = this.locations.filter(location => location.toLowerCase().includes(locationName.toLowerCase()));
      if (!location) {
        throw new HttpException('Location does not exist', 404)
      }
      resolve(location);
    });
  }
}
