import { AppState } from '../reducers';
/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { AuthActions, AuthActionTypes, LoginSuccess } from './auth.actions';
import { AuthModel } from './auth.model';

export const authFeatureKey = 'auth';

export interface AuthState {
    authModel: AuthModel;
    checkingAuthStatus: boolean;
}

export const initialState: AuthState = {
    authModel: {
        isLoggedIn: null,
        id: null,
        needsLogin: null,
        showLoading: true
    },
    checkingAuthStatus: false
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {

        case AuthActionTypes.IsLoggedInCheck: {
            return {
                ...state,
                checkingAuthStatus: true
            };
        }
        case AuthActionTypes.IsLoggedInCheckSuccess: {
            return {
                ...state,
                authModel: {
                    ...state.authModel,
                    isLoggedIn: action.payload.loggedIn,
                    id: action.payload.idmId,
                    needsLogin: !action.payload.loggedIn
                },
                checkingAuthStatus: false
            };
        }
        case AuthActionTypes.Login: {
            return {
                ...state,
                checkingAuthStatus: true
            };
        }
        case AuthActionTypes.LoginSuccess: {
            return {
                ...state,
                checkingAuthStatus: false
            };
        }
        default: {
            return state;
        }
    }
}

export const selectAuthModel = ((state: AppState) => state.auth.authModel);
