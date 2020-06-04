import { LoginSuccess } from './../../../core/auth/_actions/auth.actions';
import { Component, HostBinding, ViewEncapsulation, Input, OnInit } from '@angular/core';

// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
import { User, KeycloakService, currentUser, Login, Logout } from 'src/app/core/auth';
import { AppState } from 'src/app/core/reducers';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

	user$: Observable<User>;
	// adds padding to the top of the document, so the content is below the header
	@HostBinding('class.bx--header') headerClass = true;

	brandTemplate = 'IBM';

	hasHamburger = true;
	leftPanelActive = false;
	hasActiveChild = true;
	showSearch = true;
	showUserPanel = false;

	constructor(private store: Store<AppState>, private keycloakService: KeycloakService) {
	}

	hamburgerClicked(event) {
		// console.log(event);
	}

	notificationClicked(event) {
		// console.log(event);
	}

	avatarClicked(event) {
		this.showUserPanel = !this.showUserPanel;
	}

	ngOnInit() {
		this.user$ = this.store.pipe(select(currentUser));
		// const authenticated = this.keycloakService.isAuthenticated();
		// console.log('IS AUTHENTICATED: >>> ', authenticated);
		// // localStorage.setItem(environment.authTokenKey, keycloakService.getToken());
		// if (authenticated) {
		// 	this.store.dispatch(new LoginSuccess({ authToken: this.keycloakService.getToken() }));
		// }
		// this.store.dispatch(new Login({authToken: this.keycloakService.getToken()}));
	}

	login() {
		console.log('IN UserProfile Component, Login: >>>>>> ');
		// this.keycloakService.login();
		this.store.dispatch(new Login());
	}

	/**
	 * Log out
	 */
	logout() {
		this.store.dispatch(new Logout());
	}

}
