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
  import {Tenant} from '@sinny777/microservices-core';
  // import { Tenant } from '../models';
  import {TenantRepository} from '../repositories';
  import {authenticate, AuthenticationBindings} from '@loopback/authentication';
  import { UserProfile } from '@loopback/security';
import { inject } from '@loopback/core';



@api({basePath: '/api/accounts', paths: {}})
export class AccountController {
  constructor(
    @repository(TenantRepository)
    public tenantRepository : TenantRepository,
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