
import {HttpErrors} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import {User, AuthUser} from '../models';
import { CommonServiceI } from '../keys'

export class CommonService implements CommonServiceI {
  constructor( ) {}

 convertToUserProfile(user: User): UserProfile {
    // since first name and lastName are optional, no error is thrown if not provided
    if(!user || !user.id){
      throw new HttpErrors.NotAcceptable('User or User Id cannot be null');
    }
    let name = '';
    if (user.firstName) name = `${user.firstName}`;
    if (user.lastName)
    name = user.firstName
        ? `${name} ${user.lastName}`
        : `${user.lastName}`;
    return {[securityId]: user.id, name: name, email: user.email, username: user.username};
  }

}