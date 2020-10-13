import {bind, BindingScope, inject, service} from '@loopback/core';
import {UserProfile, SecurityBindings} from '@loopback/security';
// import { AuthenticationBindings } from '@loopback/authentication';
import {HttpErrors} from '@loopback/rest';
import { KeycloakService } from './keycloak.service';

// const https = require('https');

@bind({scope: BindingScope.REQUEST})
export class AccountService {

  //  kcAdminClient: KcAdminClient;
   CLIENT_ID: any;
   CLIENT_SECRET: any

  constructor(
    @service(KeycloakService)
    private keycloakService : KeycloakService, 
    @inject(SecurityBindings.USER)
    private currentUserProfile: UserProfile,     
  ) {  }

  async getUserDetails(): Promise<UserProfile> {
    console.log('IN AccountService.getUserDetails: >>>> ', this.currentUserProfile);
    if (!this.currentUserProfile) {
      throw new HttpErrors.Unauthorized(
        `User is not authenticated...`,
      );
    }

    return this.currentUserProfile;
  }

  async getCustomers(filter: any): Promise<any> {
    console.log('IN AccountService.getCustomers: >>>> ', filter);
    try {
      return this.keycloakService.getClients(filter);
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error getUserInfo: ${error.message}`,
      );
    }    
  }


}
