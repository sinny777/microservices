// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../_base/crud';
// State
import { MarkersState } from './marker.reducers';
import { each } from 'lodash';
import { Marker } from './models/marker.model';


export const selectMarkersState = createFeatureSelector<MarkersState>('gsiRequests');

export const selectMarkerById = (gsiRequestId: string) => createSelector(
    selectMarkersState,
    gsiRequestsState => gsiRequestsState.entities[gsiRequestId]
);

export const selectMarkersPageLoading = createSelector(
    selectMarkersState,
    gsiRequestsState => {
        return gsiRequestsState.listLoading;
    }
);

export const selectMarkersActionLoading = createSelector(
    selectMarkersState,
    gsiRequestsState => gsiRequestsState.actionsloading
);

export const selectLastCreatedMarkerId = createSelector(
    selectMarkersState,
    gsiRequestsState => gsiRequestsState.lastCreatedMarkerId
);

export const selectMarkersPageLastQuery = createSelector(
    selectMarkersState,
    gsiRequestsState => gsiRequestsState.lastQuery
);

export const selectMarkersInStore = createSelector(
    selectMarkersState,
    gsiRequestsState => {
        const items: Marker[] = [];
        each(gsiRequestsState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: Marker[] = httpExtension.sortArray(items, gsiRequestsState.lastQuery.sortField, gsiRequestsState.lastQuery.sortOrder);
        return new QueryResultsModel(result, gsiRequestsState.totalCount);
    }
);

export const selectMarkersShowInitWaitingMessage = createSelector(
    selectMarkersState,
    gsiRequestsState => gsiRequestsState.showInitWaitingMessage
);

export const selectHasMarkersInStore = createSelector(
    selectMarkersState,
    queryResult => {
        if (!queryResult.totalCount) {
            return false;
        }

        return true;
    }
);
