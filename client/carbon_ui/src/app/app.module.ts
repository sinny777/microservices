import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// carbon-components-angular default imports
import { UIShellModule, DialogModule, SearchModule, TilesModule, PlaceholderModule } from 'carbon-components-angular';
// import { Search20Module } from '@carbon/icons-angular/lib/search/20';
// import { Notification20Module } from '@carbon/icons-angular/lib/notification/20';
// import { UserAvatar20Module } from '@carbon/icons-angular/lib/user--avatar/20';
// import { AppSwitcher20Module } from '@carbon/icons-angular/lib/app-switcher/20';
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
import { HeaderComponent } from './header/header.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		AppRoutingModule,
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
		PlaceholderModule
	],
	providers: [

	],
	bootstrap: [AppComponent]
})
export class AppModule { }
