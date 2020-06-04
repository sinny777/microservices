import { Action } from '@ngrx/store';
import { User } from '../_models/user.model';

export enum AuthActionTypes {
	Login = '[Login] Action',
	LoginSuccess = '[LoginSuccess] Action',
	Logout = '[Logout] Action',
	UserRequested = '[Request User] Action',
	UserLoaded = '[Load User] Auth API'
}

export class Login implements Action {
	readonly type = AuthActionTypes.Login;
}

export class LoginSuccess implements Action {
	readonly type = AuthActionTypes.LoginSuccess;
	constructor(public payload: { authToken: string }) { }
}

export class Logout implements Action {
	readonly type = AuthActionTypes.Logout;
}

export class UserRequested implements Action {
	readonly type = AuthActionTypes.UserRequested;
}

export class UserLoaded implements Action {
	readonly type = AuthActionTypes.UserLoaded;
	constructor(public payload: { user: User }) { }
}

export type AuthActions = Login | LoginSuccess | Logout | UserRequested | UserLoaded;
