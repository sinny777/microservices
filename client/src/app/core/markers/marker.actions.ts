// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Marker } from './models/marker.model';
import { QueryParamsModel } from '../_base/crud';

export enum MarkerActionTypes {
    AllMarkersRequested = '[Markers Module] All Markers Requested',
    AllMarkersLoaded = '[Markers API] All Markers Loaded',
    SaveMarker = '[Save Marker Component] Save Marker On Server',
    MarkerCreated = '[Edit Marker Dialog] Marker Created',
    MarkerUpdated = '[Edit Marker Dialog] Marker Updated',
    MarkerDeleted = '[Markers List Page] Marker Deleted',
    MarkersPageRequested = '[Markers List Page] Markers Page Requested',
    MarkersPageLoaded = '[Markers API] Markers Page Loaded',
    MarkersPageCancelled = '[Markers API] Markers Page Cancelled',
    MarkersPageToggleLoading = '[Markers] Markers Page Toggle Loading',
    MarkersActionToggleLoading = '[Markers] Markers Action Toggle Loading'
}

export class SaveMarker implements Action {
    readonly type = MarkerActionTypes.SaveMarker;
    constructor(public payload: { marker: Marker }) { }
}

export class MarkerCreated implements Action {
    readonly type = MarkerActionTypes.MarkerCreated;
    constructor(public payload: { marker: Marker }) { }
}

export class MarkerUpdated implements Action {
    readonly type = MarkerActionTypes.MarkerUpdated;
    constructor(public payload: {
      marker: Update<Marker>
    }) { }
}

export class MarkerDeleted implements Action {
    readonly type = MarkerActionTypes.MarkerDeleted;
    constructor(public payload: { id: string }) {}
}

export class MarkersPageRequested implements Action {
    readonly type = MarkerActionTypes.MarkersPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class MarkersPageLoaded implements Action {
    readonly type = MarkerActionTypes.MarkersPageLoaded;
    constructor(public payload: { markers: Marker[], totalCount: number, page: QueryParamsModel  }) { }
}


export class MarkersPageCancelled implements Action {
    readonly type = MarkerActionTypes.MarkersPageCancelled;
}

export class MarkersPageToggleLoading implements Action {
    readonly type = MarkerActionTypes.MarkersPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class MarkersActionToggleLoading implements Action {
    readonly type = MarkerActionTypes.MarkersActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type MarkerActions = MarkerCreated
| MarkerUpdated
| MarkerDeleted
| SaveMarker
| MarkersPageLoaded
| MarkersPageCancelled
| MarkersPageToggleLoading
| MarkersPageRequested
| MarkersActionToggleLoading;
