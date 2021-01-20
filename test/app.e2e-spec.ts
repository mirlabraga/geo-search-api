import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { LOCATIONS } from './../src/locations/locations.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (GET /locations?q=hastin)', () => {
    const locationsExpect = LOCATIONS;
    const query = "hastin";

    return request(app.getHttpServer())
    .get(`/locations?q=${query}`)
      .expect(200)
      .expect(locationsExpect);
  });

  it('/ (GET /locations?q=TEST)', () => {
    const locationsExpect = LOCATIONS;
    const query = "TEST";

    return request(app.getHttpServer())
      .get(`/locations?q=${query}`)
      .expect(404)
      .expect({"statusCode":404,"message":"cannot find locations"});
  });
});
