
  import {
    get,    
    api,
    ResponseObject,
    post,
    getModelSchemaRef,
    requestBody,
  } from '@loopback/rest';
  import {AuthenticationBindings, authenticate} from '@loopback/authentication';
  import { inject } from '@loopback/core';
  import { UserProfile } from '@loopback/security';
  import { CognosApiServiceI, CreateSessionPayload } from '../services/cognos.service';
import { CreateCognosSessionRequestBody, CreateCognosSessionSchema } from './specs/dashboard-controller.specs';
  // import { CommonServiceBindings, CommonServiceI } from 'microservices-core/dist/keys';
  // import { User } from 'microservices-core/dist/models';
  // import {authorize} from 'loopback4-authorization';

  @api({basePath: '/api/dashboard', paths: {}})
  export class DashboardController {

    constructor(
      // @inject(CommonServiceBindings.COMMON_SERVICE) public commonService: CommonServiceI    
     @inject('services.CognosApiService')
     private cognosApiService: CognosApiServiceI       
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



    @post('/cognos/session', {
      responses: {
        '200': {
          description: 'Device model instance',
          content: {'application/json': {schema: CreateCognosSessionSchema}},
        },
      },
    })
    @authenticate('jwt')
    async createCognosSession(
      @requestBody(CreateCognosSessionRequestBody)
      payload: CreateSessionPayload
    ): Promise<any> {
      return this.cognosApiService.createCognosSession(payload.webDomain, payload.expiresIn);      
    }


  
  }
  