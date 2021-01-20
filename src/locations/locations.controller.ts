import { Controller, Get, Query, Req } from '@nestjs/common';
import { LocationsDto } from './locations.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async findByFilter(@Query() query): Promise<LocationsDto[]> {
    const locations = await this.locationsService.getLocations(query.q);
    return locations;
  }
}
