// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
// Auth
import { AuthGuard, ModuleGuard } from '../../core/auth';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		// canActivate: [ModuleGuard],
		// data: { moduleName: 'mainModule' },
		children: [
			{
				path: 'dashboard', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
				canActivate: [AuthGuard]
			},
			{
				path: 'builder', loadChildren: () => import('./content/builder/builder.module').then(m => m.BuilderModule),
				canActivate: [AuthGuard]
			},
			{
				path: 'user-management', loadChildren: () => import('../pages/user-management/user-management.module').then(m => m.UserManagementModule)
				// canActivate: [NgxPermissionsGuard],
				// data: {
				// 	permissions: {
				// 		only: ['accessToECommerceModule'],
				// 		redirectTo: 'error/403'
				// 	}
				// }
			},
			{path: 'error/:type/:code', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
