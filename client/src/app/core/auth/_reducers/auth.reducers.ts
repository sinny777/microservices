import { AuthActions, AuthActionTypes } from '../_actions/auth.actions';
import { User } from '../_models/user.model';
import { Auth } from '../_models/auth.model';

export interface AuthState {
    loggedIn: boolean;
    authData: Auth;
    user: User;
    isUserLoaded: boolean;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    authData: undefined,
    user: undefined,
    isUserLoaded: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login: {
            // const _token: Token = action.payload.authData;
            const _authData: Auth = action.payload.authData;
            return {
                loggedIn: false,
                authData: _authData,
                user: undefined,
                isUserLoaded: false
            };
        }

        case AuthActionTypes.UserRequested: {
            console.log('In AuthReducer, UserRequested: >>> ', action);
            const _authData: Auth = action.payload.authData;
            return {
              loggedIn: true,
              authData: _authData,
              user: undefined,
              isUserLoaded: false
            };
        }

        case AuthActionTypes.UserLoaded: {
            const _user: User = action.payload.user;
            return {
                ...state,
                user: _user,
                isUserLoaded: true
            };
        }

        case AuthActionTypes.Logout:
            return initialAuthState;

        default:
            return state;
    }
}
