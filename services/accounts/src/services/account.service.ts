import {bind, inject, BindingScope} from '@loopback/core';
import {UserProfile} from '@loopback/security';
import { AuthenticationBindings } from '@loopback/authentication';
import {HttpErrors} from '@loopback/rest';

import { TokenServiceBindings } from '@sinny777/microservices-core';
import KcAdminClient from 'keycloak-admin';
import {Issuer} from 'openid-client';
// import * as CONFIG from '../config/config.json';
const https = require('https');

@bind({scope: BindingScope.SINGLETON})
export class AccountService {

   kcAdminClient: KcAdminClient;
   CLIENT_ID: any;
   CLIENT_SECRET: any

  constructor(
    @inject(TokenServiceBindings.KEYCLOAK_URL)
    private keycloadURL: string, 
    @inject(TokenServiceBindings.KEYCLOAK_REALM)
    private keycloakRealm: string, 
    @inject(AuthenticationBindings.CURRENT_USER)
    private currentUserProfile: UserProfile     
  ) {
    
    if(!this.kcAdminClient){
        this.CLIENT_ID = process.env.CLIENT_ID;
        this.CLIENT_SECRET = process.env.CLIENT_SECRET;
    
        // console.log('CLIENT_ID: >> ', this.CLIENT_ID);
        // console.log('CLIENT_SECRET: >> ', this.CLIENT_SECRET);    
        // const verifySSL = process.env.NODE_ENV === 'production'; 

        const verifySSL = false;
        https.globalAgent.options.rejectUnauthorized = verifySSL;
        this.kcAdminClient = new KcAdminClient({
            baseUrl: keycloadURL+'/auth',
            realmName: keycloakRealm,
            requestConfig: {
              httpsAgent: new https.Agent({  
                rejectUnauthorized: verifySSL
              })
            }
        });
    }

    // this.initKeycloak().finally(() => {
    //   console.log("<<<< KEYCLOAK INIT COMPLETED: >>> ");
    // });

  }

  async initKeycloak() {
    console.log('IN KEYCOAK ADMIN CLIENT INIT : >>>> ');
    await this.kcAdminClient.auth({
        grantType: 'client_credentials',
        clientId: this.CLIENT_ID,
        clientSecret: this.CLIENT_SECRET
      } as any);
    
    const keycloakIssuer = await Issuer.discover(
      this.keycloadURL+'/auth/realms/'+this.keycloakRealm
    );

    const client = new keycloakIssuer.Client({
      client_id: this.CLIENT_ID, 
      client_secret: this.CLIENT_SECRET
    });
    // Use the grant type 'password'
    let tokenSet = await client.grant({
      grant_type: 'client_credentials',     
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET
    });

    // Periodically using refresh_token grant flow to get new access token here
    setInterval(async () => {
      const refreshToken: any = tokenSet.refresh_token;
      tokenSet = await client.refresh(refreshToken);
      // console.log('NEW ACCESS TOKEN: >>> ', tokenSet.access_token);
      this.kcAdminClient.setAccessToken(tokenSet.access_token as any);
    }, 30 * 60 * 1000); // 30 minutes

    // console.log('INIT ADMIN KEYCLOAK API COMPLETED: >>>>>> ', kcAdminClient.accessToken);
    console.log('INIT ADMIN KEYCLOAK API COMPLETED: >>>>>> ');

  }

  async getUserDetails(): Promise<UserProfile> {
    console.log('IN AccountService.getUserDetails: >>>> ', this.currentUserProfile);
    if (!this.currentUserProfile) {
      throw new HttpErrors.Unauthorized(
        `User is not authenticated...`,
      );
    }

    try {
      if(!this.kcAdminClient || !this.kcAdminClient.accessToken){
        await this.initKeycloak();
      }      
      // const groups = await this.kcAdminClient.users.listGroups({id: this.currentUserProfile.id});  
      // const skipClients = CONFIG.skip_clients;
      // this.currentUserProfile.groups = groups;      
     
    } catch (error) {
      console.error(error);
      throw new HttpErrors.Unauthorized(
        `Error getUserDetails: ${error.message}`,
      );
    }
    return this.currentUserProfile;
  }

  async getClients(filter: any): Promise<any> {
    console.log('IN AccountService.getClients: >>>> ', filter);
    try {
      if(!this.kcAdminClient || !this.kcAdminClient.accessToken){
        await this.initKeycloak();
      }   
      
      if(filter && filter.length > 0){
        let filteredClients = [];
        for (const clientId of filter) {
          const payload = {"clientId": clientId};
          let clients = await this.kcAdminClient.clients.find(payload);
          if(clients && clients.length > 0){
            const client = {id: clients[0].id, clientId: clients[0].clientId, name: clients[0].name, description: clients[0].description};
            filteredClients.push(client);
          }          
        }
        return await filteredClients;
      }else{
        return await this.kcAdminClient.clients.find();  
      }
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error getUserInfo: ${error.message}`,
      );
    }    
  }


}
