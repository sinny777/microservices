// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)},
   {path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)},
	 {path: '**', redirectTo: 'main/error/403', pathMatch: 'full'}
   // {path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
