import { AuthLoginCheckResponse } from './auth.model';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
// import './keycloak';


declare const Keycloak: any;

@Injectable()
export class KeycloakApiService {

    // private keycloak: any;

    constructor(private keycloakService: KeycloakService) {
        // this.keycloak = new Keycloak('keycloak.json');
    }

    isLoggedIn(): Observable<AuthLoginCheckResponse> {
        /*
        const checkLogin = this.keycloak.init({ onLoad: 'check-sso' });
        const keycloakObserver = Observable
            .create((observer: Observer<AuthLoginCheckResponse>) => {
                checkLogin
                    .success(loggedIn => observer.next({ loggedIn, idmId: this.keycloak.subject }));
                checkLogin.error(data => observer.error(data));
            });

        return keycloakObserver;
        */
       const checkLogin = this.keycloakService.isLoggedIn();
        const keycloakObserver = Observable
            .create((observer: Observer<AuthLoginCheckResponse>) => {
                checkLogin
                    .then(loggedIn => observer.next({ loggedIn, idmId: this.keycloakService.getKeycloakInstance().subject }));
                checkLogin.catch(data => observer.error(data));
            });

        return keycloakObserver;
    }

    login(): Observable<void> {
        const login = this.keycloakService.login();
        const keycloakObserver = Observable.create((observer: Observer<boolean>) => {
            login.then(data => console.log(data));
            login.catch(data => observer.error(data));
        });

        return keycloakObserver;
    }

    updateToken(): Observable<string> {
        const updateToken = this.keycloakService.updateToken(5);
        return Observable.create((observer: Observer<string>) => {
            updateToken.then(_ => observer.next(this.keycloakService.getKeycloakInstance().token));
            updateToken.catch(data => observer.error(data));
        });
    }
}
