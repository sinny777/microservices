// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap, catchError, retry } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// CRUD
import { QueryResultsModel, QueryParamsModel } from '../_base/crud';
// Services
import { BackendService } from './backend.service';
// State
import { AppState } from '../reducers';
import {
    MarkerActionTypes,
    MarkersPageRequested,
    MarkersPageLoaded,
    MarkerCreated,
    MarkerDeleted,
    MarkerUpdated,
    SaveMarker,
    MarkersActionToggleLoading,
    MarkersPageToggleLoading
} from './marker.actions';

@Injectable()
export class MarkerEffects {
    showPageLoadingDistpatcher = new MarkersPageToggleLoading({ isLoading: true });
    hidePageLoadingDistpatcher = new MarkersPageToggleLoading({ isLoading: false });

    showActionLoadingDistpatcher = new MarkersActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new MarkersActionToggleLoading({ isLoading: false });

    @Effect()
    loadMarkersPage$ = this.actions$
        .pipe(
            ofType<MarkersPageRequested>(MarkerActionTypes.MarkersPageRequested),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showPageLoadingDistpatcher);
                const requestToServer = this.backendService.findMarkers(payload.page);
                const lastQuery = of(payload.page);
                return forkJoin(requestToServer, lastQuery);
            }),
            map(response => {
                const result: QueryResultsModel = response[0];
                const lastQuery: QueryParamsModel = response[1];
                return new MarkersPageLoaded({
                    markers: result.items,
                    totalCount: result.totalCount,
                    page: lastQuery
                });
            }),
            retry(3),
            catchError((error) => {
              return error;
            })
        );

    @Effect()
    saveMarker$ = this.actions$
        .pipe(
            ofType<SaveMarker>(MarkerActionTypes.SaveMarker),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                if (!payload.marker.id) {
                  return this.backendService.createMarker(payload.marker).pipe(
                      tap(res => {
                          this.store.dispatch(new MarkerCreated({ marker: res }));
                      })
                  );
                } else {
                  return this.backendService.updateMarker(payload.marker).pipe(
                      tap(res => {
                          this.store.dispatch(new MarkerUpdated({ marker: {id: res.id, changes: res} }));
                      })
                  );
                }
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
            catchError((error) => {
              return error;
            })
        );

    @Effect()
    deleteMarker$ = this.actions$
        .pipe(
            ofType<MarkerDeleted>(MarkerActionTypes.MarkerDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.backendService.deleteMarker(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
            catchError((error) => {
              return error;
            })
        );

    constructor(private actions$: Actions, private backendService: BackendService, private store: Store<AppState>) { }
}
