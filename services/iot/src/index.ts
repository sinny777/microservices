import {IotApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {IotApplication};

export async function main(options: ApplicationConfig = {}) {
  let PORT = process.env.PORT || 3000;
  if(!options){
    options = {
      rest: {
        port: PORT,
        openApiSpec: { setServersFromRequest: true }       
      },
    }
  }

  options.rest.port = PORT;  
  options.rest.openApiSpec = { setServersFromRequest: true };
  options.rest.requestBodyParser = {json: {limit: '2mb'}};
  // options.rest.cors = {
  //     origin: '*',
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //     preflightContinue: false,
  //     optionsSuccessStatus: 204,
  //     maxAge: 86400,
  //     credentials: true     
  // }
 
  // console.log(options);
  const app = new IotApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`IoT Server is running at ${url}`);
  
  return app;
}
