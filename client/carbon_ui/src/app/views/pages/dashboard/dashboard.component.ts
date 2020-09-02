import { CognosApiService } from './../../../services/cognos-api.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

	constructor(private cognosService: CognosApiService, public sanitizer: DomSanitizer) { }

	urlSafe: SafeResourceUrl;

	ngOnInit(): void {
		this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('https://us-south.dynamic-dashboard-embedded.cloud.ibm.com/');
	}

	ngAfterViewInit() {
		this.loadDasboard();
	}

	async loadDasboard() {
		try {
			await this.cognosService.createNewSession();
			await this.cognosService.createAndInitApiFramework('cognosDashboard');
			await this.cognosService.openDashboard();
			// this.disableDashboardBarButtons = false;
		} catch (e) {
			console.log(e);
		//   this.toasterComp.showToaster(new Toaster((<any>instrumentation).errorMessage, 'error', true));
		}
	}

}
