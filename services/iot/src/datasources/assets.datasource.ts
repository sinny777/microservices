import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './default.datasource.json';

export class AssetsDataSource extends juggler.DataSource {
  static dataSourceName = 'assets';

  constructor(
    @inject('datasources.config.assets', {optional: true})
      dsConfig: object = config,
  ) {

    dsConfig = {
      name: 'assets',
      connector: process.env.DB_CONNECTOR,
      url: process.env.DB_URL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      'plugin': 'retry',
      'retryAttempts': 3,
      'retryTimeout': 1000
    };

    super(dsConfig);
    
  }
}
