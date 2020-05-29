import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';

const API_USERS_URL = 'api/users';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';
const LOGIN_URL = 'https://auth.smartthings.com/auth/realms/development/protocol/openid-connect/token';
const USERINFO_URL = 'https://auth.smartthings.com/auth/realms/development/protocol/openid-connect/userinfo/';
const IOT_BASE_URL = 'https://iot.smartthings.com';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  // Authentication/Authorization
  login(email: string, password: string): Observable<User> {
    console.log('IN AUTH SERVICE LOGIN METHOD: >>>> ');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const params = new HttpParams()
    .set('username', email)
    .set('password', password)
    .set('client_id', 'smartcity_web')
    // params.set('client_secret', '367a50eb-e8d9-414b-9256-4a0b966e7fe9');
    .set('grant_type', 'password')
    .set('scope', 'openid roles');

    // return this.http.post<User>(LOGIN_URL, params.toString(), { headers });

    return this.http.post<User>(LOGIN_URL, params.toString(), { headers })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        }),
        catchError(err => {
          console.error(err);
          return null;
        })
      );

  }

  getUserByToken(): Observable<User> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    // return this.http.get<User>(API_USERS_URL, {headers: httpHeaders});
    return this.http.post<User>(IOT_BASE_URL+'/api/dashboard/users/me', {headers: httpHeaders})
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        }),
        catchError(err => {
          console.error(err);
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
    return this.http.get(API_USERS_URL + '/forgot?=' + email)
      .pipe(catchError(this.handleError('forgot-password', []))
      );
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_USERS_URL);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(API_USERS_URL + `/${userId}`);
  }


  // DELETE => delete the user from the server
  deleteUser(userId: number) {
    const url = `${API_USERS_URL}/${userId}`;
    return this.http.delete(url);
  }

  // UPDATE => PUT: update the user on the server
  // tslint:disable-next-line
  updateUser(_user: User): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.put(API_USERS_URL, _user, {headers: httpHeaders});
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: User): Observable<User> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<User>(API_USERS_URL, user, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<QueryResultsModel>(API_USERS_URL + '/findUsers', queryParams, {headers: httpHeaders});
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
}
