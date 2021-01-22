import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsController } from './locations/locations.controller';
import { LocationsModule } from './locations/locations.module';
import { LocationsService } from './locations/locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoLocation } from './entity/location.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [LocationsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }), TypeOrmModule.forFeature([GeoLocation]), TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  })],
  controllers: [AppController, LocationsController],
  providers: [LocationsService, AppService],
})
export class AppModule {}
