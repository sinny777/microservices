// RxJS
// import { of } from 'rxjs';
// import { catchError, finalize, tap, debounceTime, delay, distinctUntilChanged } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../_base/crud';
// State
import { AppState } from '../reducers';
import { selectMarkersInStore, selectMarkersPageLoading, selectMarkersShowInitWaitingMessage } from './marker.selectors';


export class MarkersDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectMarkersPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectMarkersShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectMarkersInStore)
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
