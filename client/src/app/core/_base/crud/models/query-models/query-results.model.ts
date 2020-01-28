export class QueryResultsModel {
	// fields
	items: any[];
	totalCount: number;

	constructor(_items: any[] = [], _totalCount: number = 0) {
		this.items = _items;
		this.totalCount = _totalCount;
	}

}
