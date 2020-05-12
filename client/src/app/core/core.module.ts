// Anglar
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import * as fromAuth from './auth/auth.reducer';

import { AUTH_REDUCERS, syncReducers, resetOnLogout, AppState } from './reducers';
// Layout Directives
import { ContentAnimateDirective, HeaderDirective, MenuDirective, StickyDirective } from './_base/layout';
// Pipes
import { FirstLetterPipe, GetObjectPipe, JoinPipe, OffcanvasDirective, SafePipe, ScrollTopDirective, SparklineChartDirective, TabClickEventDirective, TimeElapsedPipe, ToggleDirective } from './_base/layout';
// Services
import { CookieService } from 'ngx-cookie-service';
import { KeycloakApiService } from './auth/keycloak-api.service';
import { environment } from '../../environments/environment';

export const metaReducers: MetaReducer<AppState>[] = environment.production ?
 [resetOnLogout] : [...AUTH_REDUCERS, resetOnLogout];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
		EffectsModule.forFeature([AuthEffects]),
	],
	declarations: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe,
	],
	exports: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe,
	],
	providers: [CookieService, KeycloakApiService]
})
export class CoreModule {
}
