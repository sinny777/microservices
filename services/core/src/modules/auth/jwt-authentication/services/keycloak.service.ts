import {inject} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';
import {TokenServiceBindings} from '../keys';

import KcAdminClient from 'keycloak-admin';

let kcAdminClient;

// import * as fs from 'fs';
// import * as path from 'path';

export class KeycloakService {
  constructor(
    @inject(TokenServiceBindings.KEYCLOAK_URL)
    private keycloadURL: string, 
    @inject(TokenServiceBindings.KEYCLOAK_REALM)
    private keycloakRealm: string, 
    @inject(AuthenticationBindings.CURRENT_USER)
    private currentUserProfile: UserProfile     
  ) {

    kcAdminClient = new KcAdminClient({
        baseUrl: keycloadURL,
        realmName: keycloakRealm
    });

    this.initKeycloak().then(() =>{
        console.log('Keycloak INIT DONE: >>>> ');
    });
     
  }

  async initKeycloak() {
    await kcAdminClient.auth({
        grantType: 'client_credentials',
        clientId: 'account',
        clientSecret: 'f681eb52-8e58-468f-8d6b-76e6da70306d',
      });
  }

  /*
  async getUserInfo(): Promise<UserProfile> {
    if (!this.currentUserProfile) {
      throw new HttpErrors.Unauthorized(
        `User is not authenticated...`,
      );
    }

    try {
      
     
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error getUserInfo: ${error.message}`,
      );
    }
    return userProfile;
  }
  */

  async getUserDetails(): Promise<UserProfile> {
    if (!this.currentUserProfile) {
      throw new HttpErrors.Unauthorized(
        `User is not authenticated...`,
      );
    }

    try {

       let currentUser = await kcAdminClient.users.findOne({id: this.currentUserProfile.id});
      console.log('Fetched CurrentUserById: >>> ', currentUser);

      const roles = await kcAdminClient.users.listClientRoleMappings({
        id: this.currentUserProfile.id,
        clientUniqueId: '743a73c9-ba80-4f43-b50d-255dadc0c6b2',
      });

      this.currentUserProfile.roles = roles;
     
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error getUserInfo: ${error.message}`,
      );
    }
    return this.currentUserProfile;
  }

}