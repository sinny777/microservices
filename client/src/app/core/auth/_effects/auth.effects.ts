// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter, switchMap, map, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { defer, Observable, of, asyncScheduler } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login, Logout, UserLoaded, UserRequested } from '../_actions/auth.actions';
import { AuthService } from '../_services/index';
import { AppState } from '../../reducers';
import { environment } from '../../../../environments/environment';
import { isUserLoaded } from '../_selectors/auth.selectors';

@Injectable()
export class AuthEffects {

    @Effect({dispatch: false})
    login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        tap(action => {
            this.returnUrl = action.payload.returnUrl;
            if (action.payload.authData && action.payload.authData.userId && action.payload.authData.userId !== 'undefined' && action.payload.authData.accessToken) {
              console.log('IN LOGIN ACTION: >>> ', action);
              localStorage.setItem(environment.authTokenKey, action.payload.authData.accessToken);
              localStorage.setItem('userId', action.payload.authData.userId);
              localStorage.setItem('expires_at', action.payload.authData.expiresAt);
              // this.returnUrl = '/dashboard';
              this.store.dispatch(new UserRequested({authData: action.payload.authData, returnUrl: this.returnUrl}));
              return (new UserRequested({authData: action.payload.authData, returnUrl: this.returnUrl}));
            } else {
              console.log('Login Required....', this.returnUrl);
              this.router.navigate(['/auth/login'], {queryParams: {returnUrl: this.returnUrl}});
            }
        }),
        catchError((error) => {
          console.log(error);
          return of(error);
        })
    );


    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        tap(() => {
            localStorage.removeItem(environment.authTokenKey);
            localStorage.removeItem('userId');
            localStorage.removeItem('expires_at');
            console.log('In Logout Action after removing localstorage data: >>> ', this.returnUrl);
			      this.router.navigate(['/auth/login'], {queryParams: {returnUrl: this.returnUrl}});
        })
    );


    @Effect({dispatch: false})
    loadUser$ = this.actions$
    .pipe(
        ofType<UserRequested>(AuthActionTypes.UserRequested),
        withLatestFrom(this.store.pipe(select(isUserLoaded))),
        filter(([action, _isUserLoaded]) => !_isUserLoaded),
        switchMap(([action]) => this.auth.getUserById(action.payload.authData.userId).pipe(
        map((_user) => {
            if (_user) {
                if (!_user.pic) {
                    _user.pic = './assets/media/users/default.jpg';
                }
                // return {type: UserLoaded, payload: { user: _user }};
                this.store.dispatch(new UserLoaded({ user: _user }));
            } else {
              // return {type: Logout, payload: {}};
              this.store.dispatch(new Logout());
            }
        }),
        catchError((error) => {
          console.log(error);
          this.store.dispatch(new Logout());
          return of(error);
        })
       )
      )
    );

      @Effect({dispatch: false})
      userLoaded$ = this.actions$.pipe(
          ofType<UserLoaded>(AuthActionTypes.UserLoaded),
          tap(action => {
              // console.log('USER LOADED SUCCESSFULY: >>> ', action.payload.user);
              this.router.navigateByUrl(this.returnUrl);
          })
      );

      @Effect()
      $init = (() => {
        const authData = this.auth.getAuthData();
        return of(new Login({  authData: authData, returnUrl: '/' }), asyncScheduler);
      });

    @Effect()
    init$: Observable<Action> = defer(() => {
        const authData = this.auth.getAuthData();
        // const userToken = localStorage.getItem(environment.authTokenKey);
        let observableResult = of({type: 'NO_ACTION'});
        observableResult = of(new Login({  authData: authData, returnUrl: '/' }));
        return observableResult;
    });

    private returnUrl: string;

    constructor(private actions$: Actions,
        private router: Router,
        private auth: AuthService,
        private store: Store<AppState>) {

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
        /*
        if(event.url.indexOf('login') != -1){
          console.log("return URL is ", event.url);
        }else{
          console.log("set returnUrl: >>> ", event.url);
          this.returnUrl = event.url;
        }
        */
        this.returnUrl = event.url;
			}
		});
	}
}
