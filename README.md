# geo-search-api

Geo Search API is responsible for doing the search in the geo point from the database, where it was retrieved
from geolocations file.

Please for learning more, link on https://gitlab.com/mirlabraga/code-challenge.

The project was created for a run in the development environment. So, for see the application loader
it is necessary to do some steps.

## Development Requirements

- node >= v12 [![node](https://img.shields.io/badge/node-v12-blue.svg?cacheSeconds=2592000)](https://nodejs.org/en/download/)
- npm >= v6 [![npm](https://img.shields.io/badge/npm-v6.3.0-blue)](https://www.npmjs.com/get-npm)


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install request-multiple-urls.

```bash
$ git clone git@gitlab.com:mirlabraga/geo-search-api.git
$ cd geo-search-api
$ npm install
```

Run Migration

I used the  [TypeORM](https://github.com/typeorm/typeorm) and doing the migration from data/GB.tsv to [SQLite](https://www.sqlite.org/index.html). In the repository there is a database with all data   from GB.tsv. I recommend to remove and doing again the migration.

**The database is create when the application is start. with geonameid, name, latitude, longitude and country**

For creting new migration:
typeorm migration:create -n src/migration/GeoLocationImport

For run migration
ts-node ./node_modules/.bin/typeorm migration:run

For run revert
ts-node ./node_modules/.bin/typeorm migration:revert

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Tests

  To run the test suite, first, install the dependencies, then run `npm run test`:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Usage

```javascript
GET/ locations?q=hastin
```

## Response example

List of string name location

```javascript
[
    "Yardley Hastings",
    "Wellesbourne Hastings",
    ..
]
```

## Contributing
The contribuinte are welcome. Feel free to open pull requests.

Please make certain to update the tests as necessary.

## License
[MIT](https://choosealicense.com/licenses/mit/)
