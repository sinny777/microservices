import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/theme/base/base.component';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: 'home',
				loadChildren: () => import('./views/pages/home/home.module').then(m => m.HomeModule)
			},
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: '**', redirectTo: 'home', pathMatch: 'full' },
		],
	},
	{ path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
