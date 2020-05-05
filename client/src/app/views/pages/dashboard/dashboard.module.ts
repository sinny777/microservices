// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		NgbModule,
		AgmCoreModule.forRoot({
      	apiKey: 'AIzaSyA_xN3mG2LL27jctSXHC4eiroRvOI454SE'
    }),
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			},
		]),
	],
	providers: [GoogleMapsAPIWrapper],
	declarations: [
		DashboardComponent,
	]
})
export class DashboardModule {
}
