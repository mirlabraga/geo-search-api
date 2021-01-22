import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from './locations.service';
import { GeoLocation } from '../entity/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeoLocation])],
  providers: [LocationsService]
})
export class LocationsModule {}
