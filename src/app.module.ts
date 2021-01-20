import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsController } from './locations/locations.controller';
import { LocationsModule } from './locations/locations.module';
import { LocationsService } from './locations/locations.service';

@Module({
  imports: [LocationsModule],
  controllers: [AppController, LocationsController],
  providers: [LocationsService, AppService],
})
export class AppModule {}
