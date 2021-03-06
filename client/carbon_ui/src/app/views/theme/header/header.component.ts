import { Component, HostBinding, ViewEncapsulation, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
import { User, KeycloakService, currentUser, Login, Logout } from 'src/app/core/auth';
import { AppState } from 'src/app/core/reducers';
import { Router, RouterLinkActive } from '@angular/router';


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
	myRoute: any;

	constructor(private store: Store<AppState>, protected router: Router) {
		// this.myRoute = this.router;
	}

	hamburgerClicked(event) {
		// console.log(event);
	}

	notificationClicked(event) {
		// console.log(event);
		console.log(this.router.isActive('dashboard', false));
	}

	avatarClicked(event) {
		this.showUserPanel = !this.showUserPanel;
	}

	ngOnInit() {
		this.user$ = this.store.pipe(select(currentUser));
	}

	/**
	 * Login
	 */
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
