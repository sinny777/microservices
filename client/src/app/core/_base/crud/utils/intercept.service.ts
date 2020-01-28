// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// RxJS
import { Observable, throwError } from 'rxjs';
import { map, catchError, retryWhen, delay, tap} from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw'
// import { debug } from 'util';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {

	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// tslint:disable-next-line:no-debugger
		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
		    if (event instanceof HttpResponse) {
					if (event.url.indexOf('/api/') !== -1) {
						const totalCount = event.headers.get('x-total-count');
						if (totalCount) {
							let newBody = {items:  event.body, totalCount: totalCount};
							const modEvent = event.clone({ body: newBody });
							return modEvent;
						}
					}
					return event;
		    }
		  }),
			retryWhen(errors =>
	    errors.pipe(
	      delay(1000),
	      tap(error => {
					// console.log('ERROR: >>> ', error);
	        if (error.status !== 429) {
						if (error.status === 401) {
				      console.log('In HttpInterceptor, AUTHORIZATION REQUIRED !!! ');
				    }
	          throw error;
						// return throwError(error);
	        }
					console.log('Too many requests to CloudantDB, so retrying...');
	      })
	    ))
		);
	}
}
