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
        // openApiSpec: { setServersFromRequest: true },
        // cors: {
        //   origin: '*',
        //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        //   preflightContinue: false,
        //   optionsSuccessStatus: 204,
        //   maxAge: 86400,
        //   credentials: true,
        // }      
      },
    }
  }
  const app = new AccountsApplication(options);

  // this.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", url);
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  //   next();
  // });

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Accounts Server is running at ${url}`);
  
  return app;
}
