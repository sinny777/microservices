import {IotApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

// import * as graphqlHTTP from 'express-graphql';
// import { createGraphQlSchema } from 'openapi-to-graphql';
// import { Oas3 } from 'openapi-to-graphql/lib/types/oas3';

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

  // const graphqlPath = '/graphql'; 
  // const oas: Oas3 = <Oas3>app.restServer.getApiSpec();
  // const {schema}  = await createGraphQlSchema(oas, {
  //   strict: false, 
  //   viewer:true,
  //   baseUrl: url,
  // } );
  // const handler : graphqlHTTP.Middleware = graphqlHTTP({
  //   schema,
  //   graphiql: true
  // });
  // app.mountExpressRouter(graphqlPath, handler );
  // console.log(`Graphql: ${url}${graphqlPath}`);
  
  return app;
}
