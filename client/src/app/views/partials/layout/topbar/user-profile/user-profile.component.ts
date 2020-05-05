// Angular
import { Component, OnInit, Input } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { KeycloakService } from 'keycloak-angular';
// import { currentUser, Logout, User } from '../../../../../core/auth';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	user$: Observable<Keycloak.KeycloakProfile>;

	@Input() showAvatar: boolean = true;
	@Input() showHi: boolean = true;
	@Input() showBadge: boolean = false;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>, private keycloakService: KeycloakService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	async ngOnInit() {
		// this.user$ = this.store.pipe(select(currentUser));
		console.log('In UserProfileComponent.ngOnInit >>>>>>.... ');
		if (await this.keycloakService.isLoggedIn()) {
			console.log('In UserProfileComponent.ngOnInit, user is LoggedIn.... ');
			// this.user$ = await this.keycloakService.loadUserProfile();
			let userProfile: Keycloak.KeycloakProfile  = await this.keycloakService.loadUserProfile();
			let token  = await this.keycloakService.getToken();
			// this.user$ = userDetails;
			console.log('IN DashboardComponent, userProfile: >>>> ', userProfile);
			console.log('IN DashboardComponent, token: >>>> ', token);
		}
	}

	/**
	 * Log out
	 */
	async logout() {
		// this.store.dispatch(new Logout());
		await this.keycloakService.logout();
	}
}
