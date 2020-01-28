import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Marker } from './models/marker.model';
// import { retry } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../_base/crud';
import { environment } from '../../../environments/environment';
// import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class BackendService {

    httpHeaders: HttpHeaders;

    constructor(private http: HttpClient, private cookieService: CookieService) {
      this.refreshHeaders();
    }

     refreshHeaders() {
        let userToken = localStorage.getItem(environment.authTokenKey);
        if (!userToken) {
          let authData = this.getAuthData();
          // console.log(authData);
          userToken = authData.accessToken;
        }
        this.httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json',
          'X-IBM-Client-Id': 'default',
          'X-IBM-Client-Secret': 'SECRET',
          'Authorization': userToken ? userToken : ''
        });
        return this.httpHeaders;
    }

    getMarkerById(userId: string): Observable<Marker> {
        const httpHeaders = this.refreshHeaders();
        return this.http.get<Marker>(environment.API_BASE_URL + '/Resources/' + userId, {headers: httpHeaders});
  	}

    getAllMarkers(): Observable<Marker[]> {
      if (!this.httpHeaders) {
        this.refreshHeaders();
      }
		    return this.http.get<Marker[]>(environment.API_BASE_URL + '/Resources', {headers: this.httpHeaders});
    }

    // DELETE => delete the Marker from the server
	   deleteMarker(markerId: string) {
    		const url = environment.API_BASE_URL + '/Resources/' + markerId;
    		return this.http.delete(url);
     }

    // UPDATE => PUT: update the Marker on the server
  	updateMarker(_marker: Marker): Observable<any> {
      if (!this.httpHeaders) {
        this.refreshHeaders();
      }
  		return this.http.put(environment.API_BASE_URL + '/Resources/', _marker, { headers: this.httpHeaders });
  	}

    // CREATE =>  POST: add a new Marker to the server
	createMarker(_marker: Marker): Observable<Marker> {
    if (!this.httpHeaders) {
      this.refreshHeaders();
    }
		return this.http.post<Marker>(environment.API_BASE_URL + '/Resources/', _marker, { headers: this.httpHeaders});
	}

    // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	  findMarkers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
      if (!this.httpHeaders) {
        this.refreshHeaders();
      }

      let filter = {'limit': queryParams.pageSize, 'skip': queryParams.pageNumber};
      if (queryParams && queryParams.filter && queryParams.filter.currentUser) {
        filter['where'] = {'audit.createdBy': queryParams.filter.currentUser.email};
      }
      if (queryParams.filter.searchText && queryParams.filter.searchText !== '') {
        let likePattern = {'like': queryParams.filter.searchText.toLowerCase(), 'options': 'i'};
        if (filter['where']) {
          filter['where'] = {'and' : [filter['where'], {'or': [{'tags': likePattern}, {'additionalInfo': likePattern}, {'audit.createdBy': likePattern}]} ]};
        } else {
          filter['where'] = {'or': [{'tags': likePattern}, {'additionalInfo': likePattern}, {'audit.createdBy': likePattern}]};
        }
      }

      const httpParams: HttpParams  = new HttpParams()
        .set('filter', JSON.stringify(filter));
		  return this.http.get<QueryResultsModel>(environment.API_BASE_URL + '/Resources', { headers: this.httpHeaders, params: httpParams});
    }

 	/*
 	 * Handle Http operation that failed.
 	 * Let the app continue.
     *
	 * @param operation - name of the operation that failed
 	 * @param result - optional value to return as the observable result
 	 */
    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }

    private getAuthData() {
      const accessToken = this.getCookieVal('access_token');
      const userId = this.getCookieVal('userId');
      let expiresAt = Number(this.getCookieVal('expires_at'));
      if (!expiresAt || expiresAt <= 0) {
        expiresAt = 60000 + Date.now();
      }
      if (accessToken) {
        localStorage.setItem(environment.authTokenKey, accessToken);
      }
      return {'userId': userId, 'expiresAt': expiresAt, accessToken: accessToken};

    }

    private getCookieVal(cookieName) {
      let cookieVal = this.cookieService.get(cookieName);
      if (cookieVal && cookieVal.indexOf(':') !== -1 && cookieVal.lastIndexOf('.') !== -1) {
        cookieVal = cookieVal.substring(2, cookieVal.lastIndexOf('.'));
        // console.log("From CookieService: ", cookieName, " : ", cookieVal);
        return cookieVal;
      }

      if (!cookieVal) {
        cookieVal = localStorage.getItem(cookieName);
      }
      // console.log(cookieName, " : ", cookieVal);
      return cookieVal;
    }
}
