import { MigrationInterface, QueryRunner } from "typeorm";
const csv = require('csv-parser')
const fs = require('fs')

const DATA_PATH = process.env.DATA_PATH || './data/GB.tsv';
const TABLE_NAME = process.env.TABLE_NAME || 'geo_location';

export class GeoLocationImport1611221318689 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const results = await this.getResult();
    try {
      results.forEach(result => {
        const value = { geonameid: result.geonameid, name: result.name, latitude: result.latitude, longitude: result.longitude, country: result.country_code };
        queryRunner
          .manager
          .createQueryBuilder()
          .insert()
          .into(TABLE_NAME)
          .values(value)
          .execute()
      })
    } catch (e) {
      console.error("[ERROR] an error happened while being INSERT in Geo_Location table", e);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const results = await this.getResult();
    try {
      results.forEach(result => {
        queryRunner
          .manager
          .createQueryBuilder()
          .delete()
          .from(TABLE_NAME)
          .where("geonameid = :geonameid", { geonameid: result.geonameid })
          .execute();
      })
    } catch (e) {
      console.error("[ERROR] an error happened while being DELETE in Geo_Location table", e);
    }
  }

  public async getResult(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const result = [];
      try {
        fs.createReadStream(DATA_PATH)
          .pipe(csv({ separator: '\t' }))
          .on('data', (data: any) => result.push(data))
          .on('end', () => {
            resolve(result);
          });
      } catch (e) {
        reject("It is NOT possible parsing the file!")
      }
    });
  }
}
