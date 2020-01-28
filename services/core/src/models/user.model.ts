import {UserModifiableEntity} from './user-modifiable-entity.model';
import {model, property, hasOne} from '@loopback/repository';
// import {v4 as uuid} from 'uuid';
// import { Permission } from '@loopback/security';
// import { UserModifiableEntity } from './user-modifiable-entity.model';
import {
  UserCredentials,
  UserCredentialsWithRelations,
} from './user-credentials.model';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
      username: {
        keys: {
          username: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class User extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    defaultFn: "uuidv4"
  })
  id?: string;

  @property({
    type: 'string',
    required: false,
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  username?: string;

  // Define well-known properties here

  @property({
    type: 'string'    
  })
  firstName: string | undefined;

  @property({
    type: 'string'    
  })
  lastName: string | undefined;

  @property({
    type: 'date',
    name: 'last_login',
    postgresql: {
      column: 'last_login',
    },
  })
  lastLogin?: string;

  @hasOne(() => UserCredentials, {keyTo: 'user_id'})
  credentials?: UserCredentials;

  constructor(data?: Partial<User>) {
    super(data);
    // if (data != null && typeof data === 'object') {
    //   Object.assign(this, data);
    // }
  }
}

export interface UserRelations {
  credentials?: UserCredentialsWithRelations;
}

export type UserWithRelations = User & UserRelations;

