// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap, retry, catchError } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
// Services
import { AuthService } from '../_services';
import { QueryResultsModel } from '../../_base/crud';
// Actions
import {
    AllPermissionsLoaded,
    AllPermissionsRequested,
    PermissionActionTypes
} from '../_actions/permission.actions';
// Models
// import { Permission } from '../_models/permission.model';

@Injectable()
export class PermissionEffects {
    @Effect()
    loadAllPermissions$ = this.actions$
        .pipe(
            ofType<AllPermissionsRequested>(PermissionActionTypes.AllPermissionsRequested),
            mergeMap(() => this.auth.getAllPermissions()),
            map(response => {
                const result: QueryResultsModel = response;
                console.log('ALL PERMISSIONS LOADED, Result: ', result);
                return new AllPermissionsLoaded({permissions: result.items});
            })
          );

    @Effect()
    init$: Observable<Action> = defer(() => {
        return of(new AllPermissionsRequested());
    });

    constructor(private actions$: Actions, private auth: AuthService) { }
}
