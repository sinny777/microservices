import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/theme/base/base.component';
import { AuthGuard } from './core/auth';

const routes: Routes = [
	// {path: 'error', loadChildren: () => import('./views/pages/error/error.module').then(m => m.ErrorModule)},
	{
		path: '',
		component: BaseComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: 'error',
				loadChildren: () => import('./views/pages/error/error.module').then(m => m.ErrorModule)
			},
			{
				path: 'home',
				loadChildren: () => import('./views/pages/home/home.module').then(m => m.HomeModule)
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
				canActivate: [AuthGuard],
			},
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: '**', redirectTo: 'error/denied', pathMatch: 'full' },
		],
	},
	{ path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
