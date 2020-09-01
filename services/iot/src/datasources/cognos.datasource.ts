import {juggler} from '@loopback/service-proxy';
import * as config from './default.datasource.json';
import { inject } from '@loopback/core';

export class CognosAPIDatasource extends juggler.DataSource {
   static dataSourceName = 'cognos';
   
   constructor(
      @inject('datasources.config.cognos', {optional: true}) dsConfig: object = config          
    ) {
      // console.log('Basic ' +Buffer.from(process.env.COGNOS_CLIENT_ID +':'+ process.env.COGNOS_CLIENT_SECRET).toString('base64'));
      // console.log(process.env.COGNOS_ENDPOINT+'/v1/session');
      dsConfig = {
        name: 'CognosAPIDatasource',
        connector: 'rest',
        crud: false,
        options: {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'cache-control': 'no-cache',
            'Authorization': 'Basic ' +Buffer.from(process.env.COGNOS_CLIENT_ID +':'+ process.env.COGNOS_CLIENT_SECRET).toString('base64'),
          },
        },
        operations: [
          {
            template: {
              method: 'POST',
              url: process.env.COGNOS_ENDPOINT+'v1/session',
              body: {
                  'expiresIn': '{expiresIn}',
                  'webDomain': '{webDomain}'
              }
            },
            functions: {
              createCognosSession: ['webDomain', 'expiresIn']
            },
          },
        ],
      };

    super(dsConfig);    
  }
}

