// Angular
import { Component, OnInit } from '@angular/core';
import { LayoutConfigService } from '../../../../core/_base/layout';
import * as objectPath from 'object-path';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {

	topBarConfig: any;

	constructor(private layoutConfigService: LayoutConfigService) {

	}

	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();
		console.log(config);
		// get menu header display option
		this.topBarConfig = objectPath.get(config, 'header.topbar');
	}

}
