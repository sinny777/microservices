import {AccountsApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {AccountsApplication};

export async function main(options: ApplicationConfig = {}) {
  let PORT = process.env.PORT || 3000;
  options.rest.port = PORT;
  // options.rest.basePath =  '/api';
  if(!options){
    options = {
      rest: {
        port: PORT,
        // basePath: '/api',
        requestBodyParser: {json: {limit: '2mb'}},
        openApiSpec: { setServersFromRequest: true }       
      },
    }
  }
  const app = new AccountsApplication(options);
  
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Accopunts Server is running at ${url}`);
  
  return app;
}
