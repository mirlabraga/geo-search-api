import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async findByFilter(@Query() query): Promise<string[]> {

    if (!query) {
      throw new HttpException('Incomplete location information', 400);
   }

    const locations = await this.locationsService.getLocations(query.q);
    return locations;
  }
}
