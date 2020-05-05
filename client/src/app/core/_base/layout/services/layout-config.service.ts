// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// RxJS
import { Subject } from 'rxjs';
// Object-Path
import * as objectPath from 'object-path';
// Lodash
import { merge } from 'lodash';
// Models
import { LayoutConfigModel } from '../models/layout-config.model';
import { tap } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../crud';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class LayoutConfigService {
	// Public properties
	onConfigUpdated$: Subject<LayoutConfigModel>;
	layoutConfig: LayoutConfigModel;

	httpHeaders: HttpHeaders;

	 refreshHeaders(){
			const userToken = localStorage.getItem(environment.authTokenKey);
			console.log('userToken: >>> ', userToken);
			this.httpHeaders = new HttpHeaders({
				'Content-Type': 'application/json; charset=UTF-8',
				'Accept': 'application/json',
				'X-IBM-Client-Id': 'default',
				'X-IBM-Client-Secret': 'SECRET',
				'Authorization': userToken ? userToken: ''
			});
			return this.httpHeaders;
	}

	/**
	 * Servcie constructor
	 */
	constructor(private http: HttpClient) {
		// register on config changed event and set default config
		this.onConfigUpdated$ = new Subject();
		this.refreshHeaders();
	}

	initConfig(){
		this.findConfig({'filter': {'where': {'key': 'APP_CONFIG_SMART_CAMPUS'}}, 'sortField': '', 'sortOrder': '', 'pageNumber': 0, 'pageSize': 10})
			.pipe(
				tap(response => {
					let appConfig: {key: string, output: {LAYOUT_CONFIG: LayoutConfigModel}};
					if(response.items && response.items.length > 0){
						appConfig = response.items[0];
					}

					if(appConfig && appConfig.output && appConfig.output.LAYOUT_CONFIG){
						this.layoutConfig = appConfig.output.LAYOUT_CONFIG;
						this.saveConfig(this.layoutConfig);
						this.layoutConfig = this.reloadConfigs();
						console.log('<<<<<<<<<<< IN LayoutConfig Service, initConfig loaded from DB : >>>>>>>>>>>>>');
						console.log(this.layoutConfig);
					}
				},
					err => {
						console.error(err);
					}
				)
			)
			.subscribe();
	}

	findConfig(queryParams: QueryParamsModel): Observable<QueryResultsModel>{
		if(!this.httpHeaders){
			this.refreshHeaders();
		}
			const filter = {'where': queryParams.filter.where,'limit': queryParams.pageSize, 'skip': queryParams.pageNumber}
			const httpParams: HttpParams  = new HttpParams()
				.set('filter', JSON.stringify(filter));
		return this.http.get<QueryResultsModel>(environment.API_BASE_URL+'/Mappings', { headers: this.httpHeaders, params: httpParams});
	}

	/**
	 * Save layout config to the local storage
	 * @param layoutConfig
	 */
	saveConfig(layoutConfig: LayoutConfigModel): void {
		if (layoutConfig) {
			localStorage.setItem('layoutConfig', JSON.stringify(layoutConfig));
		}
	}

	/**
	 * Get layout config from local storage
	 */
	getSavedConfig(): LayoutConfigModel {
		const config = localStorage.getItem('layoutConfig');
		try {
			return JSON.parse(config);
		} catch (e) {
		}
	}

	/**
	 * Remove saved layout config and revert back to default
	 */
	resetConfig(): void {
		localStorage.removeItem('layoutConfig');
	}

	/**
	 * Get all config or by object path
	 * @param path | object path separated by dot
	 */
	getConfig(path?: string): LayoutConfigModel | any {
		// merge default layout config with the saved config from layout storage
		// @todo; known issue; viewing 2 or more demos at the time in different browser's tabs, can cause conflict to the layout config
		this.layoutConfig = this.getSavedConfig();

		if (path) {
			// if path is specified, get the value within object
			return objectPath.get(this.layoutConfig, path);
		}

		return this.layoutConfig;
	}

	/**
	 * Set existing config with a new value
	 * @param value
	 * @param save
	 */
	setConfig(value: any, save?: boolean): void {
		this.layoutConfig = merge(this.layoutConfig, value);

		if (save) {
			this.saveConfig(this.layoutConfig);
		}

		// fire off an event that all subscribers will listen
		this.onConfigUpdated$.next(this.layoutConfig);
	}

	/**
	 * Get brand logo
	 */
	getLogo(): string {
		const menuAsideLeftSkin = objectPath.get(this.layoutConfig, 'brand.self.skin');
		// set brand logo
		const logoObject = objectPath.get(this.layoutConfig, 'self.logo');

		let logo;
		if (typeof logoObject === 'string') {
			logo = logoObject;
		}
		if (typeof logoObject === 'object') {
			logo = objectPath.get(logoObject, menuAsideLeftSkin + '');
		}
		if (typeof logo === 'undefined') {
			try {
				const logos = objectPath.get(this.layoutConfig, 'self.logo');
				logo = logos[Object.keys(logos)[0]];
			} catch (e) {
			}
		}
		return logo;
	}

	/**
	 * Returns sticky logo
	 */
	getStickyLogo(): string {
		let logo = objectPath.get(this.layoutConfig, 'self.logo.sticky');
		if (typeof logo === 'undefined') {
			logo = this.getLogo();
		}
		return logo + '';
	}

	/**
	 * Initialize layout config
	 * @param config
	 */
	loadConfigs(config: LayoutConfigModel) {
		this.layoutConfig = this.getSavedConfig();
		// use saved config as priority, or load new config if demo does not matched
		if (!this.layoutConfig || objectPath.get(this.layoutConfig, 'demo') !== config.demo) {
			this.initConfig();
			this.layoutConfig = config;
		}
		this.saveConfig(this.layoutConfig);
	}

	/**
	 * Reload current layout config to the state of latest saved config
	 */
	reloadConfigs(): LayoutConfigModel {
		this.layoutConfig = this.getSavedConfig();
		this.onConfigUpdated$.next(this.layoutConfig);
		return this.layoutConfig;
	}

	/**
	 * Get default route name by object
	 */
	getCurrentMainRoute(): string {
		const config = this.getConfig();
		if (!config) {
			// tslint:disable-next-line:no-string-throw
			return '';
		}

		const url = config.demo;
		if (!url) {
			// tslint:disable-next-line:no-string-throw
			return '';
		}

		return url;
	}
}
