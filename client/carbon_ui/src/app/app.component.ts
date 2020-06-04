import { KeycloakService } from './../../../custom_ui/src/app/core/auth/_services/keycloak.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './core/reducers';
import { isLoggedIn } from './core/auth';
import { tap } from 'rxjs/operators';
import { LoginSuccess } from './core/auth/_actions/auth.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

	// constructor(private store: Store<AppState>, private keycloakService: KeycloakService) {}

	ngOnInit(): void {
		// this.store
		// 	.pipe(
		// 		select(isLoggedIn),
		// 		tap(loggedIn => {
		// 			if (!loggedIn) {

		// 			}
		// 		})
		// 	);
		// const authenticated = this.keycloakService.isAuthenticated();
		// console.log('IS AUTHENTICATED: >>> ', authenticated);
		// // localStorage.setItem(environment.authTokenKey, keycloakService.getToken());
		// if (authenticated) {
		// 	this.store.dispatch(new LoginSuccess({ authToken: this.keycloakService.getToken() }));
		// }
	}
}
