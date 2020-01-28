import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { Token } from '../_models/token.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';
// import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

const API_ROLES_URL = 'api/roles';

@Injectable()
export class AuthService {

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
        // console.log('userToken: >>> ', userToken);
        this.httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json',
          'X-IBM-Client-Id': 'default',
          'X-IBM-Client-Secret': 'SECRET',
          'Authorization': userToken ? userToken : ''
        });
        return this.httpHeaders;
    }

    login(email: string, password: string): Observable<any> {
        const LOGIN_URL = environment.API_BASE_URL + '/MyUsers/login';
        if (!this.httpHeaders) {
          this.refreshHeaders();
        }
        let reqOptions = {headers: this.httpHeaders};
        return this.http.post<any>(LOGIN_URL, { 'email': email, 'password': password }, reqOptions);
    }

    getUserById(userId: string): Observable<User> {
        console.log('IN getUserById, userId: >> ', userId);
        const httpHeaders = this.refreshHeaders();
        const filter = {'include': {'relation': 'roles'}};
        const httpParams: HttpParams  = new HttpParams()
    			.set('filter', JSON.stringify(filter));
    	  return this.http.get<User>(environment.API_BASE_URL + '/MyUsers/' + userId, {headers: httpHeaders, params: httpParams});
  	}

    fetchAuthToken(): Observable<Token> {
        const userToken = localStorage.getItem(environment.authTokenKey);
        const httpHeaders = this.refreshHeaders();
        const FETCH_USER_BY_TOKEN_URL = environment.API_BASE_URL + '/AccessTokens/' + userToken;
        return this.http.get<any>(FETCH_USER_BY_TOKEN_URL, { headers: httpHeaders });
    }

    getUserByToken(): Observable<any> {
        const userToken = localStorage.getItem(environment.authTokenKey);
        const httpHeaders = this.refreshHeaders();
        const FETCH_USER_BY_TOKEN_URL = environment.API_BASE_URL + '/AccessTokens/' + userToken + '/user';
        return this.http.get<any>(FETCH_USER_BY_TOKEN_URL, { headers: httpHeaders });
    }

    register(user: User): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<User>(environment.API_BASE_URL, user, { headers: httpHeaders })
            .pipe(
                map((res: User) => {
                    return res;
                }),
                catchError(err => {
                    return null;
                })
            );
    }

    /*
     * Submit forgot password request
     *
     * @param {string} email
     * @returns {Observable<any>}
     */
    public requestPassword(email: string): Observable<any> {
    	return this.http.get(environment.API_BASE_URL + '/forgot?=' + email)
    		.pipe(catchError(this.handleError('forgot-password', []))
	    );
    }


    getAllUsers(): Observable<User[]> {
      if (!this.httpHeaders) {
        this.refreshHeaders();
      }
		    return this.http.get<User[]>(environment.API_BASE_URL + '/MyUsers', {headers: this.httpHeaders});
    }

    // DELETE => delete the user from the server
	   deleteUser(userId: string) {
    		const url = environment.API_BASE_URL + '/MyUsers/' + userId;
    		return this.http.delete(url);
     }

    // UPDATE => PUT: update the user on the server
  	updateUser(_user: User): Observable<any> {
          const httpHeaders = new HttpHeaders();
          httpHeaders.set('Content-Type', 'application/json');
  		return this.http.put(environment.API_BASE_URL + '/MyUsers/', _user, { headers: httpHeaders });
  	}

    // CREATE =>  POST: add a new user to the server
	createUser(user: User): Observable<User> {
    	const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<User>(environment.API_BASE_URL + '/MyUsers/', user, { headers: httpHeaders});
	}

    // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	  findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
      // console.log('IN findUsers, queryParams: >> ', queryParams);
      if (!this.httpHeaders) {
        this.refreshHeaders();
      }

      // const httpParams: HttpParams  = new HttpParams()
      //   .set('page', JSON.stringify(queryParams.pageNumber + 1));
      const filter = {'limit': queryParams.pageSize, 'skip': queryParams.pageNumber, 'include': 'roles'};
      const httpParams: HttpParams  = new HttpParams()
        .set('filter', JSON.stringify(filter));
		  return this.http.get<QueryResultsModel>(environment.API_BASE_URL + '/MyUsers', { headers: this.httpHeaders, params: httpParams});
    }

    getUserRoles(userId: string): Observable<Role[]> {
        if (!this.httpHeaders) {
          this.refreshHeaders();
        }
        return this.http.get<Role[]>(environment.API_BASE_URL + '/MyUsers/' + userId + '/roles', { headers: this.httpHeaders});
    }

    // Permission
    getAllPermissions(): Observable<QueryResultsModel> {
        if (!this.httpHeaders) {
          this.refreshHeaders();
        }
		    return this.http.get<QueryResultsModel>(environment.API_BASE_URL + '/Permissions', { headers: this.httpHeaders});
    }

    getRolePermissions(roleId: string): Observable<Permission[]> {
        if (!this.httpHeaders) {
          this.refreshHeaders();
        }
        return this.http.get<Permission[]>(environment.API_BASE_URL + '/Permissions/' + roleId, { headers: this.httpHeaders});
    }

    // Roles
    getAllRoles(): Observable<QueryResultsModel> {
      if (!this.httpHeaders) {
        this.refreshHeaders();
      }
      return this.http.get<QueryResultsModel>(environment.API_BASE_URL + '/Roles', { headers: this.httpHeaders });
    }

    getRoleById(roleId: string): Observable<Role> {
        if (!this.httpHeaders) {
          this.refreshHeaders();
        }
		    return this.http.get<Role>(environment.API_BASE_URL + '/Roles' + `/${roleId}`, { headers: this.httpHeaders});
    }

    // CREATE =>  POST: add a new role to the server
	createRole(role: Role): Observable<Role> {
      if (!this.httpHeaders) {
        this.refreshHeaders();
      }
  		return this.http.post<Role>(environment.API_BASE_URL + '/Roles', role, { headers: this.httpHeaders});
	}

    // UPDATE => PUT: update the role on the server
	updateRole(role: Role): Observable<any> {
      if (!this.httpHeaders) {
        this.refreshHeaders();
      }
		  return this.http.put(environment.API_BASE_URL + '/Roles', role, { headers: this.httpHeaders});
	}

	// DELETE => delete the role from the server
	deleteRole(roleId: string): Observable<Role> {
    if (!this.httpHeaders) {
      this.refreshHeaders();
    }
		const url = `${environment.API_BASE_URL + '/Roles'}/${roleId}`;
		return this.http.delete<Role>(url, { headers: this.httpHeaders});
	}

    // Check Role Before deletion
    isRoleAssignedToUsers(roleId: string): Observable<boolean> {
        if (!this.httpHeaders) {
          this.refreshHeaders();
        }
        return this.http.get<boolean>(API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId, { headers: this.httpHeaders});
    }

    findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
      if (!this.httpHeaders) {
        this.refreshHeaders();
      }
        const filter = {'limit': queryParams.pageSize, 'skip': queryParams.pageNumber};
        const httpParams: HttpParams  = new HttpParams()
    			.set('filter', JSON.stringify(filter));
      return this.http.get<QueryResultsModel>(environment.API_BASE_URL + '/Roles', { headers: this.httpHeaders, params: httpParams});
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

    public getAuthData() {
      let accessToken = localStorage.getItem(environment.authTokenKey);
      if (!accessToken) {
        accessToken = this.getCookieVal('access_token');
        if (accessToken && accessToken !== 'undefined') {
            localStorage.setItem(environment.authTokenKey, accessToken);
        }
      }

      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = this.getCookieVal('userId');
        if (userId && userId !== 'undefined') {
            localStorage.setItem('userId', userId);
        }
      }

      let expiresAt = localStorage.getItem('expires_at');
      if (!expiresAt) {
        expiresAt = this.getCookieVal('expiresAt');
        if (expiresAt && expiresAt !== 'undefined') {
            localStorage.setItem('expiresAt', expiresAt);
        }
      }
      /*
      let expiresAtNumber = Number(expiresAt);
      if (!expiresAtNumber || expiresAtNumber <= 0) {
        expiresAtNumber = 60000 + Date.now();
      }
      */

      return {'userId': userId, 'expiresAt': expiresAt, accessToken: accessToken};

    }

    private getCookieVal(cookieName) {
      let cookieVal = this.cookieService.get(cookieName);
      if (cookieVal && cookieVal.indexOf(':') !== -1 && cookieVal.lastIndexOf('.') !== -1) {
        cookieVal = cookieVal.substring(2, cookieVal.lastIndexOf('.'));
      }

      if (!cookieVal) {
        cookieVal = localStorage.getItem(cookieName);
      }

      if (!cookieVal || cookieVal == null) {
        return undefined;
      }
      console.log(cookieName, ' : ', cookieVal);
      return cookieVal;
    }
}
