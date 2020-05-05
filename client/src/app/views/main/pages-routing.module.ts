// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
// Auth
// import { AuthGuard, ModuleGuard } from '../../core/auth';
import { AppAuthGuard } from '../../app.authguard';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		// canActivate: [ModuleGuard],
		// data: { moduleName: 'mainModule' },
		children: [
			{
				path: 'dashboard', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
				canActivate: [AppAuthGuard],
				data: { roles: ['admin','manager','operator', 'view-profile'] }
			},
			{
				path: 'builder', loadChildren: () => import('./content/builder/builder.module').then(m => m.BuilderModule),
				canActivate: [AppAuthGuard]
			},
			{path: 'error/:type/:code', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [AppAuthGuard]
})
export class PagesRoutingModule {
}
