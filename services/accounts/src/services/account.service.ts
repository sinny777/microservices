import {bind, inject, BindingScope} from '@loopback/core';
import {UserProfile} from '@loopback/security';
import { AuthenticationBindings } from '@loopback/authentication';
import {HttpErrors} from '@loopback/rest';

import { TokenServiceBindings } from '@sinny777/microservices-core';
import KcAdminClient from 'keycloak-admin';
import {Issuer} from 'openid-client';
const https = require('https');

let kcAdminClient: KcAdminClient;
let CLIENT_ID: any;
let CLIENT_SECRET: any

// @bind({scope: BindingScope.TRANSIENT})
export class AccountService {
  constructor(
    @inject(TokenServiceBindings.KEYCLOAK_URL)
    private keycloadURL: string, 
    @inject(TokenServiceBindings.KEYCLOAK_REALM)
    private keycloakRealm: string, 
    @inject(AuthenticationBindings.CURRENT_USER)
    private currentUserProfile: UserProfile     
  ) {

    CLIENT_ID = process.env.CLIENT_ID;
    CLIENT_SECRET = process.env.CLIENT_SECRET;

    console.log('CLIENT_ID: >> ', CLIENT_ID);
    console.log('CLIENT_SECRET: >> ', CLIENT_SECRET);

    // const verifySSL = process.env.NODE_ENV === 'production'; 
    const verifySSL = false;
    https.globalAgent.options.rejectUnauthorized = verifySSL;
    kcAdminClient = new KcAdminClient({
        baseUrl: keycloadURL+'/auth',
        realmName: keycloakRealm,
        requestConfig: {
          httpsAgent: new https.Agent({  
            rejectUnauthorized: verifySSL
          })
        }
    });

  }

  async initKeycloak() {
    // console.log('IN KEYCOAK ADMIN CLIENT INIT : >>>> ');
    await kcAdminClient.auth({
        grantType: 'client_credentials',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET
      } as any);
    
    const keycloakIssuer = await Issuer.discover(
      this.keycloadURL+'/auth/realms/'+this.keycloakRealm
    );

    const client = new keycloakIssuer.Client({
      client_id: CLIENT_ID, 
      client_secret: CLIENT_SECRET
    });
    // Use the grant type 'password'
    let tokenSet = await client.grant({
      grant_type: 'client_credentials',     
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });

    // Periodically using refresh_token grant flow to get new access token here
    setInterval(async () => {
      const refreshToken: any = tokenSet.refresh_token;
      tokenSet = await client.refresh(refreshToken);
      // console.log('NEW ACCESS TOKEN: >>> ', tokenSet.access_token);
      kcAdminClient.setAccessToken(tokenSet.access_token as any);
    }, 58 * 60 * 1000); // 58 minutes

    console.log('INIT ADMIN KEYCLOAK API COMPLETED: >>>>>> ', kcAdminClient.accessToken);

  }

  async getUserDetails(): Promise<UserProfile> {
    console.log('IN AccountService.getUserDetails: >>>> ', this.currentUserProfile);
    if (!this.currentUserProfile) {
      throw new HttpErrors.Unauthorized(
        `User is not authenticated...`,
      );
    }

    try {
      if(!kcAdminClient || !kcAdminClient.accessToken){
        await this.initKeycloak();
      }      
      const groups = await kcAdminClient.users.listGroups({id: this.currentUserProfile.id});      
      this.currentUserProfile.groups = groups;      
     
    } catch (error) {
      console.error(error);
      throw new HttpErrors.Unauthorized(
        `Error getUserDetails: ${error.message}`,
      );
    }
    return this.currentUserProfile;
  }

  async getClients(): Promise<any> {
    console.log('IN AccountService.getClients: >>>> ');
    try {
      if(!kcAdminClient || !kcAdminClient.accessToken){
        await this.initKeycloak();
      }      

     return await kcAdminClient.clients.find();    
     
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error getUserInfo: ${error.message}`,
      );
    }    
  }

  // async getClients(): Promise<any> {
  //   console.log('IN AccountService.getClients: >>>> ');
  //   try {
  //     if(!kcAdminClient || !kcAdminClient.accessToken){
  //       await this.initKeycloak();
  //     }      

  //    return await kcAdminClient.clients.find();    
     
  //   } catch (error) {
  //     throw new HttpErrors.Unauthorized(
  //       `Error getUserInfo: ${error.message}`,
  //     );
  //   }    
  // }
  

}
