// Angular
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '..';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// import { map, catchError } from 'rxjs/operators';

declare const Keycloak: any;

// const USERINFO_URL = 'https://auth.smartthings.com/auth/realms/development/protocol/openid-connect/userinfo/';
const IOT_BASE_URL = 'https://iot.smartthings.com';

@Injectable({
	providedIn: 'root'
})
export class KeycloakService {

	auth: any = {};

	keycloak: any;

	constructor(private http: HttpClient) {
		this.keycloak = new Keycloak(environment.keycloakConfig);
	}

	async init(): Promise<any> {
		if (!this.keycloak.authenticated) {
			const returnURL = window.location.origin + '/silent-check-sso.html';
			console.log('IN KeycloakService.init, returnURL: >>>>> ', returnURL);
			return await this.keycloak.init({ onLoad: 'check-sso', checkLoginIframe: false, silentCheckSsoRedirectUri: returnURL });
			// this.keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
		} else {
			console.log('IN KeycloakService.init: >>>>> ', this.keycloak.authenticated);
		}
	}

	login() {
		this.keycloak.login();
	}

	logout() {
		this.keycloak.logout();
	}

	isAuthenticated() {
		return this.keycloak.authenticated;
	}

	getToken() {
		return this.keycloak.token;
	}

	getUserByToken(): Observable<User> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		if (!userToken) {
			throw new Error('NO VALID TOKEN !! ');
		}
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<User>(IOT_BASE_URL + '/api/dashboard/users/me', { headers: httpHeaders });
		// .pipe(
		//   map((res: any) => {
		//     console.log(res);
		//     return res;
		//   }),
		//   catchError(err => {
		//     console.error(err);
		//     return null;
		//   })
		// );

	}

}
