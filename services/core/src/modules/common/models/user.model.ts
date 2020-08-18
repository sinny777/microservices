// import {UserModifiableEntity} from './user-modifiable-entity.model';
import {model, property} from '@loopback/repository';
import {UserProfile, securityId} from '@loopback/security';
// import {v4 as uuid} from 'uuid';

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
export class User implements UserProfile {
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

  constructor(data?: Partial<User>) {
    // super(data);
    // if (data != null && typeof data === 'object') {
    //   Object.assign(this, data);
    // }
  }
  [securityId]: string;
  
  [attribute: string]: any;
  name?: string | undefined;  
}

export interface UserRelations {
  
}

export type UserWithRelations = User & UserRelations;

