import {  HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { GeoLocation } from '../entity/location.entity';

@Injectable()
export class LocationsService {

  constructor(
    @InjectRepository(GeoLocation)
    private geoLocationRepository: Repository<GeoLocation>,
  ) {}

  async getLocations(locationName: string): Promise<string[]> {
    const getLocations = await this.geoLocationRepository.find({ select: ["name"],  where: { name: Like(`%${locationName}%`) }});
    if (getLocations ===undefined || getLocations.length <= 0) {
      throw new HttpException('cannot find locations', 404);
    }
    return getLocations.map(getLocations => getLocations.name);
  }
}
