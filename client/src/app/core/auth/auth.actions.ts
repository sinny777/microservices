import { AuthLoginCheckResponse } from './auth.model';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    IsLoggedInCheck = '[Auth] Is Loggedin Check',
    IsLoggedInCheckSuccess = '[Auth] Is Logged In Check Success',
    IsLoggedInCheckFail = '[Auth] Is Logged In Check Fail',
    Login = '[Auth] Login',
    LoginSuccess = '[Auth] Login Success',
    LoginFail = '[Auth] Login Fail',
    Logout = '[Auth] Logout',
    LogoutSuccess = '[Auth] Logout Success',
    LogoutFail = '[Auth] Logout Fail'
}

export class IsLoggedInCheck implements Action {
    readonly type = AuthActionTypes.IsLoggedInCheck;
}

export class IsLoggedInCheckSuccess implements Action {
    readonly type = AuthActionTypes.IsLoggedInCheckSuccess;

    constructor(public payload: AuthLoginCheckResponse) { }
}

export class IsLoggedInCheckFail implements Action {
    readonly type = AuthActionTypes.IsLoggedInCheckFail;
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: any) { }
}

export class LoginFail implements Action {
    readonly type = AuthActionTypes.LoginFail;
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class LogoutSuccess implements Action {
    readonly type = AuthActionTypes.LogoutSuccess;
}

export class LogoutFail implements Action {
    readonly type = AuthActionTypes.LogoutFail;
}

export type AuthActions =
    | Logout
    | LogoutFail
    | LogoutSuccess
    | IsLoggedInCheck
    | IsLoggedInCheckSuccess
    | IsLoggedInCheckFail
    | Login
    | LoginSuccess
    | LoginFail;
