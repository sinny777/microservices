import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './accounts.datasource.json';

export class AuthClientsDataSource extends juggler.DataSource {
  static dataSourceName = 'authclients';

  constructor(
    @inject('datasources.config.authclients', {optional: true})
    dsConfig: object = config,
  ) {

    /*
    dsConfig = {
      name: 'smartthings-accounts',
      connector: process.env.DB_CONNECTOR,
      hostname: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'smartthings-accounts'
    };
    */

    dsConfig = {
      name: 'auth-clients',
      connector: process.env.DB_CONNECTOR,
      url: process.env.DB_URL,
      database: 'auth-clients',
      'plugin': 'retry',
      'retryAttempts': 3,
      'retryTimeout': 1000
    };

    super(dsConfig);
    // console.log('IN AccountsDataSource: >>> ', dsConfig);
  }
}
