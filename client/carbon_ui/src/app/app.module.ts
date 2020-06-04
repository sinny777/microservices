import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// NGRX
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// State
import { metaReducers, reducers, AppState } from './core/reducers';

import { KeycloakService, Login, AuthGuard } from './core/auth';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ThemeModule } from './views/theme/theme.module';

// Auth
import { AuthService } from './core/auth';
// CRUD
import {
	HttpUtilsService,
	TypesUtilsService
} from './core/_base/crud';
import { LoginSuccess } from './core/auth/_actions/auth.actions';

export function initAuth(store: Store<AppState>, keycloakService: KeycloakService) {
	return () => new Promise(async resolve => {
		const authenticated = await keycloakService.init();
		if (authenticated) {
			store.dispatch(new LoginSuccess({ authToken: keycloakService.getToken() }));
		}
		resolve(true);
	});
}


@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		CoreModule,
		ThemeModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
		StoreDevtoolsModule.instrument(),
	],
	providers: [
		AuthService,
		AuthGuard,
		KeycloakService,
		HttpUtilsService,
		{
			provide: APP_INITIALIZER,
			useFactory: initAuth,
			deps: [Store, KeycloakService],
			multi: true
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
