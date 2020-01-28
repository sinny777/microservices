// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { Permission, currentUserPermissions, checkHasUserPermission } from '../../../../core/auth';

import { NgForm } from '@angular/forms';
// Layout
import { LayoutConfigModel, LayoutConfigService } from '../../../../core/_base/layout';

const builderPermissionId: string = "0d27c2603c80aed3f91561d8fbea0b4f";

@Component({
	selector: 'kt-builder',
	templateUrl: './builder.component.html',
	styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
	// Public properties
	model: LayoutConfigModel;
	@ViewChild('form', { static: true }) form: NgForm;

	// Public properties
	hasUserAccess$: Observable<boolean>;
	currentUserPermission$: Observable<Permission[]>;

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(private store: Store<AppState>, private router: Router, private layoutConfigService: LayoutConfigService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.currentUserPermission$ = this.store.pipe(select(currentUserPermissions));
		this.currentUserPermission$.subscribe(permissions => {
			if (permissions && permissions.length > 0) {
				this.hasUserAccess$ =
				this.store.pipe(select(checkHasUserPermission(builderPermissionId)));
		 		this.hasUserAccess$.subscribe(res => {
		 			if (!res) {
		 				this.router.navigateByUrl('/error/error-v1/403');
		 			}
		 		});
		 	}
		 });


		this.model = this.layoutConfigService.getConfig();
	}

	/**
	 * Reset preview
	 *
	 * @param e: Event
	 */
	resetPreview(e: Event): void {
		e.preventDefault();
		this.layoutConfigService.resetConfig();
		location.reload();
	}

	/**
	 * Submit preview
	 *
	 * @param e: Event
	 */
	submitPreview(e: Event): void {
		this.layoutConfigService.setConfig(this.model, true);
		location.reload();
	}
}
