import {AccountsApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {AccountsApplication};

export async function main(options: ApplicationConfig = {}) {
  let PORT = process.env.PORT || 3000;
  // options.rest.basePath =  '/api';
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
  options.rest.cors = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      maxAge: 86400,
      credentials: true     
  }
  const app = new AccountsApplication(options);

  // let ALLOWED_ORIGINS = ["http://localhost:4200", "https://ui-svc-smartthings.apps.cairns.os.fyre.ibm.com"];
  // app.use((req, res, next) => {
  //     let origin = req.headers.origin;
  //     let theOrigin = (ALLOWED_ORIGINS.indexOf(origin) >= 0) ? origin : ALLOWED_ORIGINS[0];
  //     res.header("Access-Control-Allow-Origin", theOrigin);
  //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  //     next();
  // });

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Accounts Server is running at ${url}`);
  
  return app;
}
