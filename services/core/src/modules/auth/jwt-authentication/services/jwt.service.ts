import {TokenService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';
import {TokenServiceBindings} from '../keys';
import * as fs from 'fs';
import * as path from 'path';

const KeyCloakCerts = require('get-keycloak-public-key');

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);
let keyCloakCerts: any;
let publicKey: string;

export class JWTService implements TokenService {
  constructor(
    @inject(TokenServiceBindings.KEYCLOAK_URL)
    private keycloadURL: string, 
    @inject(TokenServiceBindings.KEYCLOAK_REALM)
    private keycloakRealm: string, 
    @inject(TokenServiceBindings.TOKEN_ISSUER)
    private jwtIssuer: string, 
    @inject(TokenServiceBindings.TOKEN_AUDIENCE)
    private jwtAudience: string,
    @inject(TokenServiceBindings.TOKEN_ALGORITHM)
    private jwtAlgorithm: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: string,
    @inject(TokenServiceBindings.KEYS_PATH)
    private keysPath: string    
  ) {
     keyCloakCerts = new KeyCloakCerts(keycloadURL, keycloakRealm);
     try{
        publicKey  = fs.readFileSync(path.join(__dirname, this.keysPath+'/public.key'), 'utf8');
     }catch (error) {
        console.error(error);
     }
     
  }

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }

    let userProfile: UserProfile;

    try {
      
      if(!publicKey){
        // decode the token without verification to have the kid value
        const kid = jwt.decode(token, { complete: true }).header.kid;
        // fetch the PEM Public Key
        publicKey = await keyCloakCerts.fetch(kid);
        console.log('publicKEY: >>> ', publicKey);
      }
      var verifyOptions = {
        issuer:  this.jwtIssuer,
        // subject:  this.jwtAudience,
        audience:  this.jwtAudience,
        // expiresIn:  Number(this.jwtExpiresIn),
        algorithm:  [this.jwtAlgorithm]
      };

      // decode user profile from token
      const decodedToken = await verifyAsync(token, publicKey, verifyOptions);      
      console.log('decodedToken: >> ', decodedToken);
      // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
      userProfile = Object.assign(
        {[securityId]: '', name: ''},
        {
          [securityId]: decodedToken.sub,
          username: decodedToken.preferred_username,
          name: decodedToken.name,
          id: decodedToken.sub,
          firstName: decodedToken.given_name,
          lastName: decodedToken.family_name,
          roles: decodedToken.resource_access[this.jwtAudience]['roles']          
        },
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`,
      );
    }
    return userProfile;
  }

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null',
      );
    }
    // const userInfoForToken = {
    //   id: userProfile[securityId],
    //   name: userProfile.name,
    //   email: userProfile.email,
    // };
    // Generate a JSON Web Token
    // SIGNING OPTIONS
    let signOptions = {
      issuer:  this.jwtIssuer,
      subject:  this.jwtAudience,
      audience:  this.jwtAudience,
      expiresIn:  Number(this.jwtExpiresIn),
      algorithm:  this.jwtAlgorithm
    };
    // console.log('IN JWTService.generateToken, userProfile: >>>> ', userProfile[securityId]);
    // Generate a JSON Web Token
    let token: string;
    try {
      // console.log(__dirname);
      // const privateKEY  = fs.readFileSync(this.keysPath+'/private.key', 'utf8');
      // console.log(path.resolve(__dirname));
      const privateKEY  = fs.readFileSync(path.join(__dirname, this.keysPath+'/private.key'), 'utf8');
      token = await signAsync(userProfile, privateKEY, signOptions);
    } catch (error) {
      console.error(error);
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }

    return token;
  }
}