import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './core/reducers';
import { tap } from 'rxjs/operators';
import { isLoggedIn } from './core/auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {

		// this.store
		// 	.pipe(
		// 		select(isLoggedIn),
		// 		tap(userLoggedIn => {
		// 			console.log('IN AppComponent, User Is userLoggedIn: >>> ', userLoggedIn);
		// 		})
		// 	);

	}
}
