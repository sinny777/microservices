import { Action } from '@ngrx/store';
import { User } from '../_models/user.model';
import { Auth } from '../_models/auth.model';

export enum AuthActionTypes {
    Login = '[Login] Action',
    Logout = '[Logout] Action',
    Register = '[Register] Action',
    TokenRequested = '[Request Token] Action',
    UserRequested = '[Request User] Action',
    UserLoaded = '[Load User] Auth API'
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    constructor(public payload: { authData: Auth, returnUrl: string }) { }
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    constructor(public payload: { authData: Auth }) { }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class TokenRequested implements Action {
    readonly type = AuthActionTypes.TokenRequested;
    constructor(public payload: { authTokenId: string }) { }
}

export class UserRequested implements Action {
    readonly type = AuthActionTypes.UserRequested;
    constructor(public payload: { authData: Auth, returnUrl: string }) { }
}

export class UserLoaded implements Action {
    readonly type = AuthActionTypes.UserLoaded;
    constructor(public payload: { user: User }) { }
}



export type AuthActions = Login | Register | Logout | TokenRequested | UserRequested | UserLoaded;
