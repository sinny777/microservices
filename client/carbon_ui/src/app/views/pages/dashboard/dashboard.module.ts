// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/core/auth';
import { ThemeModule } from '../../theme/theme.module';

import {
	GridModule,
	ListModule,
	TabsModule,
	TilesModule,
	DialogModule
} from 'carbon-components-angular';

@NgModule({
	imports: [
		CommonModule,
		CoreModule,
		ThemeModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent,
				// canActivate: [AuthGuard],
			},
		]),
		GridModule,
		ListModule,
		TabsModule,
		TilesModule,
		DialogModule
	],
	providers: [],
	declarations: [
		DashboardComponent,
	]
})
export class DashboardModule {
}
