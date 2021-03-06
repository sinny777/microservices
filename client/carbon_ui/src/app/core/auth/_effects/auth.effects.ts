import { LoginSuccess } from './../_actions/auth.actions';
// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter, mergeMap, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login, Logout, UserLoaded, UserRequested } from '../_actions/auth.actions';
import { AuthService, KeycloakService } from '../_services/index';
import { AppState } from '../../reducers';
import { environment } from '../../../../environments/environment';
import { isUserLoaded } from '../_selectors/auth.selectors';
// import { User } from '..';

@Injectable()
export class AuthEffects {
	@Effect({ dispatch: false })
	login$ = this.actions$.pipe(
		ofType<Login>(AuthActionTypes.Login),
		tap(() => {
			let loginOptions = {};
			if (this.returnUrl && this.returnUrl.indexOf('error') !== -1) {
				loginOptions = {
					redirectUri: window.location.origin + '/'
				};
			}
			this.auth.login(loginOptions);
		})
	);

	@Effect({ dispatch: false })
	loginSuccess$ = this.actions$.pipe(
		ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
		tap(action => {
			console.log('IN LOGIN SUCCESS: >>> ');
			localStorage.setItem(environment.authTokenKey, action.payload.authToken);
			this.store.dispatch(new UserRequested());
		})
	);

	@Effect({ dispatch: false })
	logout$ = this.actions$.pipe(
		ofType<Logout>(AuthActionTypes.Logout),
		tap(() => {
			localStorage.removeItem(environment.authTokenKey);
			const logoutOptions = {
				redirectUri: window.location.origin + '/'
			};
			this.returnUrl = logoutOptions.redirectUri;
			this.auth.logout(logoutOptions);
			this.router.navigate(['/'], { queryParams: { returnUrl: logoutOptions.redirectUri } });
		})
	);

	@Effect({ dispatch: false })
	loadUser$ = this.actions$
		.pipe(
			ofType<UserRequested>(AuthActionTypes.UserRequested),
			withLatestFrom(this.store.pipe(select(isUserLoaded))),
			filter(([action, _isUserLoaded]) => !_isUserLoaded),
			mergeMap(([action, _isUserLoaded]) => this.auth.getUserByToken()),
			tap(_user => {
				if (_user) {
					console.log('USER DETAILS :>>> ', _user);
					this.store.dispatch(new UserLoaded({ user: _user }));
				} else {
					this.store.dispatch(new Logout());
				}
			}),
			catchError((error) => {
				return error;
			})
		);

	// @Effect()
	// init$ = this.actions$.pipe(
	//   ofType(ROOT_EFFECTS_INIT),
	//   map(action => ...)
	// );

	@Effect()
	init$: Observable<Action> = defer(() => {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const observableResult = of({ type: 'NO_ACTION' });
		console.log('IN AUTH EFFECT init, userToken >>>>> : ', userToken);
		// if (userToken) {
		// 	observableResult = of(new LoginSuccess({ authToken: userToken }));
		// }
		return observableResult;
	});

	private returnUrl: string;

	constructor(private actions$: Actions,
		private router: Router,
		private auth: KeycloakService,
		private store: Store<AppState>) {

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.returnUrl = event.url;
			}
		});
	}
}
