import {model, property} from '@loopback/repository';

import {BaseEntity} from '../base-entity.model';

@model({
  name: 'auth_clients',
})
export class AuthClient extends BaseEntity {
  @property({
    type: 'string',
    id: true,
    defaultFn: "uuidv4"
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    name: 'client_id',
  })
  clientId: string;

  @property({
    type: 'string',
    required: true,
    name: 'client_secret',
  })
  clientSecret: string;

  @property({
    type: 'string',
    required: true,
  })
  secret: string;

  @property({
    type: 'string',
    name: 'redirect_url',
  })
  redirectUrl?: string;

  @property({
    type: 'array',
    itemType: 'string',
    name: 'user_ids',
  })
  userIds: string[];

  @property({
    type: 'number',
    name: 'access_token_expiration',
  })
  accessTokenExpiration: number;

  @property({
    type: 'number',
    name: 'refresh_token_expiration',
  })
  refreshTokenExpiration: number;

  @property({
    type: 'number',
    name: 'auth_code_expiration',
  })
  authCodeExpiration: number;

  constructor(data?: Partial<AuthClient>) {
    super(data);
  }
}
