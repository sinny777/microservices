
import {inject} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {promisify} from 'util';
import {TokenService} from '@loopback/authentication';
import {UserProfile, securityId} from '@loopback/security';
import {TokenServiceBindings} from '../keys';
import * as fs from 'fs';
import * as path from 'path';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService implements TokenService {
  constructor(
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
  ) {}

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null',
      );
    }
    console.log('IN JWTService.generateToken with userProfile: ', userProfile[securityId]);
    // console.log('IN generateToken with securityId: ', Reflect.ownKeys(userProfile)[3] in userProfile);
    // console.log(Reflect.ownKeys(userProfile));
    userProfile.id = userProfile[securityId];

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

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }
    console.log('IN JWTTokenService.verifyToken: >>> ', token);
    console.log(path.join(__dirname, this.keysPath+'/keycloak-public.key'));
    // console.log(path.resolve(__dirname));
    // const publicKEY  = fs.readFileSync(path.join(__dirname, '../../keys/keycloak-public.key'), 'utf8'); 
    const publicKEY  = fs.readFileSync(path.join(__dirname, this.keysPath+'/keycloak-public.key'), 'utf8');
    var verifyOptions = {
      issuer:  this.jwtIssuer,
      // subject:  this.jwtAudience,
      // audience:  this.jwtAudience,
      // expiresIn:  Number(this.jwtExpiresIn),
      algorithm:  [this.jwtAlgorithm]
     };
    let userProfile: UserProfile;

    try {
      const decodedToken = await verifyAsync(token, publicKEY, verifyOptions);
      console.log('IN JWTService.verifyToken, decodedToken: >>>> ', decodedToken);
      userProfile = Object.assign(decodedToken);
      // userProfile.id =  userProfile[securityId];
      delete userProfile.aud;
      delete userProfile.iss;
      delete userProfile.sub;
      delete userProfile.exp;
      delete userProfile.iat;
      // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
      /*
      userProfile = Object.assign(
        {[securityId]: '', name: ''},
        {[securityId]: decodedToken.id, id: decodedToken.id, name: decodedToken.name, email: decodedToken.email, username: decodedToken.username}
      ); 
      */     
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`,
      );
    }
    return userProfile;
  }


}