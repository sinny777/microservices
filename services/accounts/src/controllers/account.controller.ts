import {
    Count,
    CountSchema,
    Filter,
    repository,
    Where,
  } from '@loopback/repository';
  import {
    post,
    param,
    get,
    getFilterSchemaFor,
    getModelSchemaRef,
    getWhereSchemaFor,
    patch,
    put,
    del,
    requestBody,
    api,
  } from '@loopback/rest';
  import {SecurityBindings, UserProfile} from '@loopback/security';
  import { AccountService } from './../services/account.service';
  // import {Tenant} from '@sinny777/microservices-core';
  import {authenticate, AuthenticationBindings} from '@loopback/authentication';
  
import { inject, service } from '@loopback/core';

@api({basePath: '/api/accounts', paths: {}})
export class AccountController {
  constructor(
    @service(AccountService)
    public accountService : AccountService,
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
    // @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<UserProfile> {
    // (@jannyHou)FIXME: explore a way to generate OpenAPI schema
    // for symbol property
    console.log('IN AccountsController.fetchCurrentUser, currentUserProfile: >>>> ', currentUserProfile);
    // currentUserProfile.id = currentUserProfile[securityId];
    // delete currentUserProfile[securityId];
    return this.accountService.getUserDetails();    
  }

  @get('/clients', {
    // security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Fetch Clients/Tenants',
        content: {
          'application/json': Object,
        },
      },
    },
  })
  @authenticate('jwt')
  async findClients(
   ): Promise<any> {
    // (@jannyHou)FIXME: explore a way to generate OpenAPI schema
    // for symbol property
    console.log('IN AccountsController.findClients: >>>> ');
    return this.accountService.getClients();    
  }

}