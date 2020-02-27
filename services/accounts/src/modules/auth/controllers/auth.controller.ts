
import {inject} from '@loopback/context';
import {
  HttpErrors,
  Request,
  Response,
  get,
  post,
  getModelSchemaRef,
  requestBody,
  api,
  RestBindings,
  param,
  RedirectRoute,
} from '@loopback/rest';

import { LoginRequest } from '../models/login-request.dto';
import { User } from 'microservices-core';
import { TokenServiceBindings } from 'microservices-core/dist/keys';
import { UserServiceBindings } from '../../auth/keys';
import { TokenService, UserService } from '@loopback/authentication';
import { Credentials } from 'microservices-core/dist/models/types';
import { UserProfile } from '@loopback/security';
import { AuthUser } from 'microservices-core/dist/models';

// import { Passport} from 'passport';

@api({
    basePath: '/api/accounts',
    paths: {}})
export class AuthController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @inject(RestBindings.Http.REQUEST) public request: Request,
    @inject(RestBindings.Http.RESPONSE) public response: Response 
  ) {}
  
  @post('/auth/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async login(
    @requestBody({
      description: 'LoginRequest',
      required: true,
    })
    req: LoginRequest,
  ): Promise<{token: string}> {
    console.log('IN AuthController, login: >>> ', req);
    try {
      // ensure the user exists, and the password is correct
      const credentials: Credentials = {username: req.username, password: req.password};
      const user = await this.userService.verifyCredentials(credentials);
      // convert a User object into a UserProfile object (reduced set of properties)
      console.log(user);
      if(user && user.id){
        const userProfile = this.userService.convertToUserProfile(user);
        console.log('IN AuthController.Login, userProfile: >> ', userProfile);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return {token};
      }else{
        throw new HttpErrors.NotFound('User not found !');
      }      
    } catch (error) {
      throw new HttpErrors.InternalServerError(error
        // AuthErrorKeys.InvalidCredentials,
        // 'Invalid Credentials !'
      );
    }
  }

  @get('/auth/basic', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async basicAuth(): Promise<{token: string}> {
    console.log('IN AuthController, BasicAuth: >>> ', this.request.headers);
    try {
      const credentials: Credentials = this.extractCredentials(this.request);
      const user = await this.userService.verifyCredentials(credentials);
      // convert a User object into a UserProfile object (reduced set of properties)
      const userProfile = this.userService.convertToUserProfile(user);
      // create a JSON Web Token based on the user profile
      const token = await this.jwtService.generateToken(userProfile);
      this.response.setHeader("API-OAUTH-METADATA-FOR-PAYLOAD", token);
			this.response.setHeader("API-OAUTH-METADATA-FOR-ACCESSTOKEN", token);
			// response.setHeader("API-Authenticated-Credential", token.userId);
      return {token};
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        // AuthErrorKeys.InvalidCredentials,
        'Invalid Credentials !'
      );
    }
  }

  @get('/auth/token/{token}', {
    responses: {responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                userProfile: {
                  type: AuthUser,
                },
              },
            },
          },
        },
      },
    },
   },
  })
  async getUser(
    @param.path.string('token') token: string,    
  ): Promise<{userProfile: UserProfile}> {
    try {
      // ensure the user exists, and the password is correct
      // const token = await this.jwtService.generateToken(userProfile);
      // console.log('IN AuthController, authRedirect: req >>>>> ', token);
      console.log('IN AuthController.getUser, authRedirect: payload.token >>>>> ', token);
      let userProfile: any = await this.jwtService.verifyToken(token);
      // console.log(userProfile);
      // let result: string = "SUCCESS";
      return userProfile; 
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        // AuthErrorKeys.InvalidCredentials,
        'Something Went Wrong !'
      );
    }
  }

  @get('/auth/google')
  googleOAuth() {
    console.log('IN AuthController, googleOAuth: >>> ');
    try {
      // let passport = new Passport();
      // passport.authenticate('google', { scope: ['profile'] });
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        // AuthErrorKeys.InvalidCredentials,
        'Invalid Credentials !'
      );
    }
  }

  @get('/auth/google/callback', {
    responses: {
      '200': {
        description: 'Google Authentication callback'        
      },
    },
  })
  async googleOAuthCallback(): Promise<void> {
    console.log('IN AuthController, googleOAuthCallback: >>> ', this.request.headers);
    try {
      // let passport = new Passport();
      // passport.authenticate('google', { failureRedirect: '/login' }),
      //   function(req: any, res: any) {
      //     console.log('<<<<<<<<<<<<< GOOGLE AUTHENTICATED >>>>>>>>>>>>');
      //     res.redirect('/');
      //   };        
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        // AuthErrorKeys.InvalidCredentials,
        'Invalid Credentials !'
      );
    }
  }


  extractCredentials(request: Request): Credentials {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }

    // for example : Basic Z2l6bW9AZ21haWwuY29tOnBhc3N3b3Jk
    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue.startsWith('Basic')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not of type 'Basic'.`,
      );
    }

    //split the string into 2 parts. We are interested in the base64 portion
    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2)
      throw new HttpErrors.Unauthorized(
        `Authorization header value has too many parts. It must follow the pattern: 'Basic xxyyzz' where xxyyzz is a base64 string.`,
      );
    const encryptedCredentails = parts[1];

    // decrypt the credentials. Should look like :   'username:password'
    const decryptedCredentails = Buffer.from(
      encryptedCredentails,
      'base64',
    ).toString('utf8');

    //split the string into 2 parts
    const decryptedParts = decryptedCredentails.split(':');

    if (decryptedParts.length !== 2) {
      throw new HttpErrors.Unauthorized(
        `Authorization header 'Basic' value does not contain two parts separated by ':'.`,
      );
    }

    const creds: Credentials = {
      username: decryptedParts[0],
      password: decryptedParts[1],
    };

    return creds;
  }
  
}
