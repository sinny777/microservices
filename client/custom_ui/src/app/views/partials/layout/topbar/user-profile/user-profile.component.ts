import { KeycloakService } from './../../../../../core/auth/_services/keycloak.service';
import { Login } from './../../../../../core/auth/_actions/auth.actions';
// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';

@Component({
  selector: 'kt-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  // Public properties
  user$: Observable<User>;

  @Input() userDropdownStyle = 'light';
  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;

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
   ngOnInit() {
    this.user$ = this.store.pipe(select(currentUser));
    const authenticated = this.keycloakService.isAuthenticated();
    console.log('IS AUTHENTICATED: >>> ', authenticated);
    // localStorage.setItem(environment.authTokenKey, keycloakService.getToken());
    if(authenticated){
      this.store.dispatch(new Login({authToken: this.keycloakService.getToken()}));
    }
    // this.store.dispatch(new Login({authToken: this.keycloakService.getToken()}));
  }

  login(){
    console.log('IN UserProfile Component, Login: >>>>>> ');
    this.keycloakService.login();
    // this.store.dispatch(new Login({authToken: null}));
  }

  /**
   * Log out
   */
  logout() {
    this.store.dispatch(new Logout());
  }
}
