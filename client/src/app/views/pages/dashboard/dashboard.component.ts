// Angular
import { Component, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Services
import { LayoutConfigService } from '../../../core/_base/layout';
// Widgets model
import { SparklineChartOptions } from '../../../core/_base/layout';
import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { selectAuthModel } from '../../../core/auth/auth.reducer';
import { IsLoggedInCheck } from '../../../core/auth/auth.actions';

import { AppState } from '../../../core/reducers';
import { Login } from '../../../core/auth/auth.actions';
import { takeWhile } from 'rxjs/operators';

// const userManagementPermissionId: string = "115b565bc29bf5bb0c545ad280f8a3dc";

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

	private alive = true;
	chartOptions1: SparklineChartOptions;
	widget4_1: Widget4Data;

	constructor(
		private layoutConfigService: LayoutConfigService,
		protected router: Router,
		private store: Store<AppState>,
	    private route: ActivatedRoute
		) {
	}

	async ngOnInit() {

		let userModel = await this.store.select(selectAuthModel);
		console.log(userModel);

		this.chartOptions1 = {
			data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
			color: this.layoutConfigService.getConfig('colors.state.brand'),
			border: 3
		};
		// @ts-ignore
		this.widget4_1 = shuffle([
			{
				pic: './assets/media/files/doc.svg',
				title: 'Metronic Documentation',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/jpg.svg',
				title: 'Project Launch Evgent',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/pdf.svg',
				title: 'Full Developer Manual For 4.7',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/javascript.svg',
				title: 'Make JS Great Again',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/zip.svg',
				title: 'Download Ziped version OF 5.0',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				pic: './assets/media/files/pdf.svg',
				title: 'Finance Report 2016/2017',
				url: 'https://keenthemes.com.my/metronic',
			},
		]);

	}
}
