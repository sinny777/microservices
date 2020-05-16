import {
    Count,
    CountSchema,
    Filter,
    repository,
    Where,
  } from '@loopback/repository';
  import {
    get,
    getFilterSchemaFor,
    getWhereSchemaFor,
    param,
    patch,
    post,
    put,
    requestBody,
    api,
    ResponseObject,
  } from '@loopback/rest';
  import {AuthenticationBindings, authenticate} from '@loopback/authentication';
  import { inject } from '@loopback/core';
  import { UserProfile, securityId } from '@loopback/security';
  // import { CommonServiceBindings, CommonServiceI } from 'microservices-core/dist/keys';
  import { User } from 'microservices-core/dist/models';
  // import {authorize} from 'loopback4-authorization';

  /**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
    description: 'Ping Response',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            greeting: {type: 'string'},
            date: {type: 'string'},
            url: {type: 'string'},
            headers: {
              type: 'object',
              properties: {
                'Content-Type': {type: 'string'},
              },
              additionalProperties: true,
            },
          },
        },
      },
    },
  };
  
  @api({basePath: '/api/dashboard', paths: {}})
  export class DashboardController {
    constructor(
      // @inject(CommonServiceBindings.COMMON_SERVICE) public commonService: CommonServiceI      
    ) {}
  
    @get('/users/me', {
      // security: OPERATION_SECURITY_SPEC,
      responses: {
        '200': {
          description: 'The current user profile',
          content: {
            'application/json': Object,
          },
        },
      },
    })
    @authenticate('jwt')
    async fetchCurrentUser(
      @inject(AuthenticationBindings.CURRENT_USER)
      currentUserProfile: UserProfile,
    ): Promise<UserProfile> {
      // (@jannyHou)FIXME: explore a way to generate OpenAPI schema
      // for symbol property
      console.log('IN DashboardController.fetchCurrentUser, currentUserProfile: >>>> ', currentUserProfile);
      // currentUserProfile.id = currentUserProfile[securityId];
      // delete currentUserProfile[securityId];
      return currentUserProfile;
    }
  
  }
  