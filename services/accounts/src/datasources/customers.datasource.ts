import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './default.datasource.json';

export class CustomersDataSource extends juggler.DataSource {
  static dataSourceName = 'customers';

  constructor(
    @inject('datasources.config.customers', {optional: true})
      dsConfig: object = config,
  ) {

    // const SSL_CA: String = String(process.env.DB_SSL_CA).replace(/\\n/g, '\n');
    // console.log(SSL_CA)

    dsConfig = {
      name: 'customers',
      connector: process.env.DB_CONNECTOR,
      url: process.env.DB_URL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      'plugin': 'retry',
      'retryAttempts': 3,
      'retryTimeout': 1000,
      "ssl": true,
      "auto_reconnect": true,
      // "sslValidate": true,
      // "checkServerIdentity": true,
      // "sslCA": fs.readFileSync('./keys/mongo_cert.pem')
    };

    // console.log(dsConfig);

    super(dsConfig);
    
  }
}
