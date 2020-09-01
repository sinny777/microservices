import { ResponseObject } from '@loopback/rest';

/**
* OpenAPI response for ping()
*/
export const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: { type: 'string' },
          date: { type: 'string' },
          url: { type: 'string' },
          headers: {
            type: 'object',
            properties: {
              'Content-Type': { type: 'string' },
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export const CreateCognosSessionSchema = {
  type: 'object',
  required: ['webDomain', 'expiresIn'],
  properties: {
    webDomain: {
      type: 'string'
    },
    expiresIn: {
      type: 'number'
    },
  },
};

export const CreateCognosSessionRequestBody = {
  description: 'CreateCognosSessionRequestBody',
  required: true,
  content: {
    'application/json': { schema: CreateCognosSessionSchema },
  },
};