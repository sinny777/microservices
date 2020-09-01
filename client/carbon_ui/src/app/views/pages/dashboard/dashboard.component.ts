import { CognosApiService } from './../../../services/cognos-api.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

	constructor(private cognosService: CognosApiService) { }

	ngOnInit(): void {
	}

	ngAfterViewInit() {
		this.loadDasboard();
	}

	async loadDasboard() {
		try {
			await this.cognosService.createNewSession();
			await this.cognosService.createAndInitApiFramework();
			await this.cognosService.openDashboard();
			// this.disableDashboardBarButtons = false;
		} catch (e) {
			console.log(e);
		//   this.toasterComp.showToaster(new Toaster((<any>instrumentation).errorMessage, 'error', true));
		}
	}

}
