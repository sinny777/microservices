import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './core/reducers';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';
import { isLoggedIn } from './core/auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

	cognosUrl: string;
  	loadCognosApi: Promise<any>;

	constructor(private store: Store<AppState>) {
		this.cognosUrl = environment.cognos_api_js;
	}

	ngOnInit(): void {
		console.log('IN AppComponent init method: >>>>');
		// this.store
		// 	.pipe(
		// 		select(isLoggedIn),
		// 		tap(userLoggedIn => {
		// 			console.log('IN AppComponent, User Is userLoggedIn: >>> ', userLoggedIn);
		// 		})
		// 	);

		// this.loadCognosApi = new Promise((resolve) => {
		// 	this.loadCognosApiScript();
		// 	console.log('cognos script loaded');
		//  });

	}

	/*
	loadCognosApiScript() {
		this.loadScript(this.cognosUrl);
	}

	loadScript(srcUrl) {
		let node = document.createElement('script');
		node.src =  srcUrl;
		node.type = 'text/javascript';
		node.async = false;
		node.charset = 'utf-8';
		document.getElementsByTagName('head')[0].appendChild(node);
	  }
	*/

}
