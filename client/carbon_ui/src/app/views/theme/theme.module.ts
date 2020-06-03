
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// carbon-components-angular default imports
import {
	UIShellModule,
	DialogModule,
	SearchModule,
	TilesModule,
	PlaceholderModule,
	GridModule,
	ListModule,
	TabsModule
} from 'carbon-components-angular';

import {
	FadeModule,
	AppSwitcherModule,
	UserAvatarModule,
	NotificationModule,
	DashboardModule,
	SettingsModule,
	CarbonModule,
	WatsonModule
} from '@carbon/icons-angular';

import { BaseComponent } from './base/base.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
	declarations: [
		BaseComponent,
		HeaderComponent,
		FooterComponent
	],
	exports: [
		BaseComponent,
		HeaderComponent,
		FooterComponent
	],
	providers: [

	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		UIShellModule,
		DialogModule,
		SearchModule,
		CarbonModule,
		FadeModule,
		DashboardModule,
		SettingsModule,
		WatsonModule,
		TilesModule,
		NotificationModule,
		UserAvatarModule,
		AppSwitcherModule,
		PlaceholderModule,
		GridModule,
		ListModule,
		TabsModule
	]
})
export class ThemeModule {
}
