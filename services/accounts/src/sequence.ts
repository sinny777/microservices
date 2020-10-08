import {inject} from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  InvokeMiddleware,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';

import { AuthenticationBindings, AuthenticateFn, AUTHENTICATION_STRATEGY_NOT_FOUND, USER_PROFILE_NOT_FOUND } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {

    /**
   * Optional invoker for registered middleware in a chain.
   * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
   */
  @inject(SequenceActions.INVOKE_MIDDLEWARE, {optional: true})
  protected invokeMiddleware: InvokeMiddleware = () => false;

  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
  ) {}

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const finished = await this.invokeMiddleware(context);
      if (finished) return;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);

     
      // response.header("Access-Control-Allow-Origin", 'http://localhost:4200');
      // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      // console.log('HEADERS SET FOR CORS : >>> ');
      
      // Do authentication of the user and fetch user permissions below
      const authUser: UserProfile | undefined = await this.authenticateRequest(request);
      console.log('AFTER AUTHENTICATION, authUser >>> ', authUser);
      // console.log('AFTER AUTHENTICATION, CurrentUSer >>> ', this.getCurrentUser());
      /*
      if(authUser){
        // const user: any = {id: authUser.id, firstName: authUser.name, email: authUser.name};
        // user.permissions = [{permission: PermissionKey.CreateAnyUser, allowed: true}];
        // this.setCurrentUser(user);
        // const currentUser = this.getCurrentUser();
        // console.log('currentUser: >> ', currentUser);
        if(authUser.role){
            // Parse and calculate user permissions based on role and user level
            const permissions: PermissionKey[] = this.fetchUserPermissons(
              authUser.permissions,
              authUser.role.permissions,
            );
            // This is main line added to sequence
            // where we are invoking the authorize action function to check for access
            const isAccessAllowed: boolean = await this.checkAuthorization(
              permissions,
            );
            if (!isAccessAllowed) {
              throw new HttpErrors.Forbidden(AuthorizeErrorKeys.NotAllowedAccess);
            }
        }
        
      }
      */
      
      const result = await this.invoke(route, args);
      // debug('%s result -', route.describe(), result);
      this.send(response, result);
    } catch (error) {
      if (
        error.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        error.code === USER_PROFILE_NOT_FOUND
      ) {
        Object.assign(error, {statusCode: 401 /* Unauthorized */});
      }
      this.reject(context, error);
      // return;
    }
  }

  // extractCredentials(request: Request): string {
  //   if (!request.headers.authorization) {
  //     throw new HttpErrors.Unauthorized(`Authorization header not found.`);
  //   }

  //   // for example : Bearer xxx.yyy.zzz
  //   const authHeaderValue = request.headers.authorization;

  //   //split the string into 2 parts : 'Bearer ' and the `xxx.yyy.zzz`
  //   const parts = authHeaderValue.split(' ');
    
  //   const token = parts[1];

  //   return token;
  // }

}
