import { AuthActionTypes, IsLoggedInCheckSuccess, LoginSuccess } from './auth.actions';
import { KeycloakApiService } from './keycloak-api.service';
/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { mergeMap, map, tap, catchError, retry, switchMap } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';

import {
    IsLoggedInCheck
} from './auth.actions';
import { AppState } from '../reducers';

@Injectable()

export class AuthEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private authApi: KeycloakApiService
    ) { }

    @Effect() isLoggedInCheck$ = this.actions$
        .pipe(
            ofType<IsLoggedInCheck>(AuthActionTypes.IsLoggedInCheck),
            switchMap(() => this.authApi.isLoggedIn()),
            mergeMap(response => [
                new IsLoggedInCheckSuccess(response)
            ]),
            retry(3),
            catchError((error) => {
                return error;
            })
        );

    @Effect() login$ = this.actions$
        .pipe(
            ofType(AuthActionTypes.Login),
            switchMap(() => this.authApi.login()),
            mergeMap(login => [
                new LoginSuccess(login)
            ]),
            retry(3),
            catchError((error) => {
                return error;
            })
        );
}
