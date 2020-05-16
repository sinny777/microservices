import {model, property} from '@loopback/repository';
import { Tenant, Role } from '../../common/models';
import { securityId, UserProfile } from '@loopback/security';

@model()
export class AuthUser implements UserProfile {
  
  // [attribute: string]: any;
  
  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
    required: true
  })
  [securityId]: string ;
 
  @property({
    type: Role,
    required: false,
  })
  role: Role;

  @property({
    type: 'string',
    required: false,
  })
  tenantId: string;

  @property({
    type: 'string',
  })
  externalAuthToken?: string;

  @property({
    type: 'string',
  })
  externalRefreshToken?: string;

  constructor() {
    // super(data);
  }
}
