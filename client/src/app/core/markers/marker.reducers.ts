// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// Actions
import { MarkerActions, MarkerActionTypes } from './marker.actions';
// CRUD
import { QueryParamsModel } from '../_base/crud';
// Models
import { Marker } from './models/marker.model';

// tslint:disable-next-line:no-empty-interface
export interface MarkersState extends EntityState<Marker> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedMarkerId: string;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<Marker> = createEntityAdapter<Marker>();

export const initialMarkersState: MarkersState = adapter.getInitialState({
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastQuery:  new QueryParamsModel({}),
    lastCreatedMarkerId: undefined,
    showInitWaitingMessage: true
});

export function markersReducer(state = initialMarkersState, action: MarkerActions): MarkersState {
    switch  (action.type) {
        case MarkerActionTypes.MarkersPageToggleLoading: return {
            ...state, listLoading: action.payload.isLoading, lastCreatedMarkerId: undefined
        };
        case MarkerActionTypes.MarkersActionToggleLoading: return {
            ...state, actionsloading: action.payload.isLoading
        };
        case MarkerActionTypes.SaveMarker: return {
            ...state
        };
        case MarkerActionTypes.MarkerCreated: return adapter.addOne(action.payload.marker, {
             ...state, lastCreatedMarkerId: action.payload.marker.id
        });
        case MarkerActionTypes.MarkerUpdated: return adapter.updateOne(action.payload.marker, state);
        case MarkerActionTypes.MarkerDeleted: return adapter.removeOne(action.payload.id, state);
        case MarkerActionTypes.MarkersPageCancelled: return {
            ...state, listLoading: false, lastQuery: new QueryParamsModel({})
        };
        case MarkerActionTypes.MarkersPageLoaded: {
          console.log('IN Marker Reducer, MarkersPageLoaded: >>> ', action.payload);
            return adapter.addMany(action.payload.markers, {
                ...initialMarkersState,
                totalCount: action.payload.totalCount,
                lastQuery: action.payload.page,
                listLoading: false,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getMarkerState = createFeatureSelector<MarkersState>('markers');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
