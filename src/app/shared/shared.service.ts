import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalSettings } from './global.settings';
import { SharedPropertyService } from './services/shared-property.service';
import { HttpService } from './services/http.service';
import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataResult } from './data-result';

@Injectable({
	providedIn: 'root'
})

export class SharedService {
	private userEndpoint = '';
	private authEndpoint = '';
	private globalEndpoint = '';
	private isCreated: boolean = false;
	get IsCreated(): boolean {
		return this.isCreated;
	}

	set IsCreated(isCreated: boolean) {
		this.isCreated = isCreated;
	}

	private target: string = '';
	get Target(): string {
		return this.target;
	}

	set Target(target: string) {
		this.target = target;
	}

	private action: string = '';
	get Action(): string {
		return this.action;
	}

	set Action(action: string) {
		this.action = action;
	}

	constructor(public service: HttpService,
		public shared: SharedPropertyService) {
		// this.shared.RootMediaEndPoint = this.getRootMediaEndPoint();
		// this.shared.RootSiteEndPoint = this.getRootSiteEndPoint();
		// this.shared.RootEndPointAPI = this.getRootEndPointAPI();
		// this.shared.RootEndPoint = this.getRootEndPoint();
		// this.shared.RootAuth = this.getRootAuth();
		// this.shared.RootAPIVersion = this.getRootAPIVersion();
		// this.updateEndPoint();
	}

	// updateEndPoint() {
	// 	this.userEndpoint = this.shared.RootEndPoint + '/SEUsers';
	// 	this.authEndpoint = this.shared.RootAuth;
	// 	this.globalEndpoint = this.shared.RootEndPoint + '/SEGlobalSettings';
	// }

	// getRootMediaEndPoint() {
	// 	if (environment.production) {
	// 		return './';
	// 	}
	// 	return GlobalSettings.Info.Server;
	// }

	// getRootSiteEndPoint() {
	// 	if (environment.production) {
	// 		return './';
	// 	}
	// 	return GlobalSettings.Info.Server;
	// }

	// getRootEndPointAPI() {
	// 	if (environment.production) {
	// 		return './v2/web/api';
	// 	}
	// 	return GlobalSettings.Info.Server + '/v2/web/api';
	// }

	// getRootEndPoint() {
	// 	if (environment.production) {
	// 		return './v2/web/odata';
	// 	}
	// 	return GlobalSettings.Info.Server + '/v2/web/odata';
	// }

	// getRootAuth() {
	// 	if (environment.production) {
	// 		return './v2/web/oauth2/Token';
	// 	}
	// 	return GlobalSettings.Info.Server + '/v2/web/oauth2/Token';
	// }

	// getRootAPIVersion() {
	// 	if (environment.production) {
	// 		return './v2/web/api/SECommons/version';
	// 	}
	// 	return GlobalSettings.Info.Server + '/v2/web/api/SECommons/version';
	// }

	getItems<T>(url: string, options?: any): Observable<DataResult<T> | any> {
		return this.service.getItems(url, options).pipe(map(res => {
			let dataJSON = res;
			let arrs = dataJSON['value'] as T[];
			let total = parseInt(dataJSON['@odata.count'], 10);
			let nextLink = dataJSON['@odata.nextLink'];
			return new DataResult(arrs, total, nextLink);
		}),
			catchError(error => this.handleError('getItems', error)));
	}

	getTotalRows(url: string, options?: any): Observable<number | any> {
		return this.service.getItems(url, options).pipe(map(res => {
			return parseInt(res['@odata.count'], 10);
		}),
			catchError(error => this.handleError('getTotalRows', error)));
	}

	getItemsNoPaging<T>(url: string, options?: any): Observable<Array<T>> {
		let arrItems: Array<T> = new Array<T>();
		if (options) {
			let top = options.top;
			if (top === undefined) {
				options.top = 20;
			}
			let skip = options.skip;
			if (skip === undefined) {
				options.skip = 0;
			}
		}
		else {
			options = {
				top: 20,
				skip: 0
			};
		}
		let loop: boolean = false;
		return new Observable(obs => {
			let subject = new BehaviorSubject(url);
			subject.subscribe(res => {
				if (loop) {
					options = undefined;
				}
				this.service.getItems(res, options).subscribe(data => {
					let dataJSON = data;
					let items = dataJSON['value'] as T[];
					if (items && items.length > 0) {
						for (let item of items) {
							arrItems.push(item);
						}
						let nextLink = dataJSON['@odata.nextLink'];
						if (nextLink) {
							url = decodeURIComponent(nextLink);
							loop = true;
							subject.next(res);
						}
						else {
							let count = parseInt(dataJSON['@odata.count'], 10);
							options.skip = options.top + options.skip;
							if (count > options.skip) {
								subject.next(res);
							}
							else {
								subject.complete();
								subject.unsubscribe();
								obs.next(arrItems);
								obs.complete();
							}
						}
					}
					else {
						subject.complete();
						subject.unsubscribe();
						obs.next(arrItems);
						obs.complete();
					}
				});
			});
		});
	}

	getItemsNoPagingUseListId<T>(url: string, options?: any, options2?: any): Observable<Array<T>> {
		let arrItems: Array<T> = new Array<T>();
		if (options) {
			let top = options.top;
			if (top === undefined) {
				options.top = 20;
			}
			let skip = options.skip;
			if (skip === undefined) {
				options.skip = 0;
			}
		}
		else {
			options = {
				top: 20,
				skip: 0
			};
		}
		let loop: boolean = false;
		return new Observable(obs => {
			let subject = new BehaviorSubject(url);
			subject.subscribe(res => {
				if (loop) {
					options = undefined;
				}
				this.service.getItemsNoPaging(res, options, options2).subscribe(data => {
					let dataJSON = data;
					let items = dataJSON['value'] as T[];
					if (items && items.length > 0) {
						for (let item of items) {
							arrItems.push(item);
						}
						let nextLink = dataJSON['@odata.nextLink'];
						if (nextLink) {
							url = decodeURIComponent(nextLink);
							loop = true;
							subject.next(res);
						}
						else {
							let count = parseInt(dataJSON['@odata.count'], 10);
							options.skip = options.top + options.skip;
							if (count > options.skip) {
								subject.next(res);
							}
							else {
								subject.complete();
								subject.unsubscribe();
								obs.next(arrItems);
								obs.complete();
							}
						}
					}
					else {
						subject.complete();
						subject.unsubscribe();
						obs.next(arrItems);
						obs.complete();
					}
				});
			});
		});
	}

	loginCode(code: any): Observable<{} | Object> {
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		let body = new HttpParams();
		let redirect_uri = window.location.origin + '/oauth';
		body = body.set('redirect_uri', redirect_uri);
		body = body.set('grant_type', GlobalSettings.Info.Account.type);
		body = body.set('client_id', GlobalSettings.Info.Account.id);
		body = body.set('code', code.code);
		return this.service.postRequestBaseUrl(this.authEndpoint, headers, body).pipe(
			catchError(error => this.handleError('loginCode', error)));
	}

	getWowzaServerUrl(): Observable<any> {
		let options = { filter: `key eq 'wowzaDisplayUrl'`, top: 1 };
		let endPointUrl = this.shared.RootEndPoint + '/SEGlobalSettings';
		return this.service.getItems(endPointUrl, options);
	}

	getServerDownloadWowzaUrl(): Observable<any> {
		let options = { filter: `key eq 'wowzaDownloadUrl'`, top: 1 };
		let endPointUrl = this.shared.RootEndPoint + '/SEGlobalSettings';
		return this.service.getItems(endPointUrl, options);
	}

	getItem<T>(url: string, id?: number, options?: any): Observable<T | any> {
		return this.service.getItem(url, id, options);
	}

	addItem<T>(url: string, newItem: T): Observable<string | any> {
		return this.service.addItem(url, newItem);
	}

	checkExistItem<T, K>(url: string, fieldName: string, key: T): Observable<Array<K> | any> {
		return this.service.existsItem(url, fieldName, key);
	}

	updateItem<T>(url: string, updateItem: T, userId: number): Observable<string | any> {
		return this.service.updateItem(url, updateItem, userId);
	}

	updateCamera<T>(url: string, updateItem: T, userId: number): Observable<string | any> {
		return this.service.updateCamera(url, updateItem, userId);
	}

	deleteItem(url: string, itemId: number): Observable<Response | any> {
		return this.service.deleteItem(url, itemId);
	}

	/*User Service */
	updateUser(user: any, id: number): Observable<string> {
		return this.updateItem(this.userEndpoint, user, id).pipe(catchError(error => this.handleError('updateUser', error)));
	}

	/*Global Settings Service */
	getGlobalSettings(options?: any): Observable<Array<any>> {
		return this.getItems(this.globalEndpoint, options).pipe(catchError(error => this.handleError('getGlobalSettings', error)));
	}

	/*Authenticate Service */
	accessTokenExpired() {
		const token = localStorage.getItem(GlobalSettings.Info.access_token);
		if (token === null) {
			return true;
		}
		return this.shared.isTokenExpired(token);
	}

	refreshTokenNull() {
		let refToken = localStorage.getItem(GlobalSettings.Info.refresh_token);
		if (refToken === null) {
			return true;
		}
		return false;
	}

	loggedIn() {
		return new Observable(obs => {
			const access_token = localStorage.getItem(GlobalSettings.Info.access_token);
			if (access_token === null) {
				obs.next(false);
				obs.complete();
				return;
			}
			const refresh_token = localStorage.getItem(GlobalSettings.Info.refresh_token);
			if (refresh_token === null) {
				obs.next(false);
				obs.complete();
				return;
			}
			if (this.shared.isTokenExpired(access_token)) {
				this.refreshToken().subscribe(res => {
					obs.next(res);
					obs.complete();
				});
			}
			else {
				obs.next(true);
				obs.complete();
			}
		});
	}

	refreshToken() {
		return new Observable(obs => {
			let refToken = localStorage.getItem(GlobalSettings.Info.refresh_token);
			if (refToken === null) {
				this.logout();
				if (!this.isLiveMap()) {
					obs.next(false);
					obs.complete();
				}
				return;
			}
			let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
			let body = new HttpParams();
			body = body.set('client_id', GlobalSettings.Info.Account.id);
			body = body.set('grant_type', GlobalSettings.Info.Account.refresh);
			body = body.set('refresh_token', refToken);
			this.service.postRequestBaseUrl(this.authEndpoint, headers, body).pipe(
				catchError(error => this.handleError('refreshToken', error)))
				.subscribe(res => {
					localStorage.setItem(GlobalSettings.Info.access_token, res['access_token']);
					localStorage.setItem(GlobalSettings.Info.refresh_token, res['refresh_token'] ? res['refresh_token'] : refToken);
					localStorage.setItem(GlobalSettings.Info.last_login, (new Date().getTime()).toString());
					console.log('Access Token is refreshed from canActivate Routing');
					obs.next(true);
					obs.complete();
				});
		});
	}

	isLiveMap() {
		let currentUrl = window.location.href;
		currentUrl = currentUrl.split('?')[0];
		if (currentUrl.endsWith('welcome-page')
		) {
			return true;
		}
		return false;
	}

	getTokenExpirationDate() {
		const access_token = localStorage.getItem(GlobalSettings.Info.access_token);
		return this.shared.getTokenExpirationDate(access_token);
	}

	getNewToken() {
		return new Observable(resp => {
			let refToken = localStorage.getItem(GlobalSettings.Info.refresh_token);
			let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
			let body = new HttpParams();
			body = body.set('client_id', GlobalSettings.Info.Account.id);
			body = body.set('grant_type', GlobalSettings.Info.Account.refresh);
			body = body.set('refresh_token', refToken);
			this.service.postRequestBaseUrl(this.authEndpoint, headers, body).pipe(
				catchError(error => this.handleError('getNewToken', error)))
				.subscribe(res => {
					localStorage.removeItem(GlobalSettings.Info.access_token);
					localStorage.removeItem(GlobalSettings.Info.refresh_token);
					localStorage.removeItem(GlobalSettings.Info.last_login);
					localStorage.setItem(GlobalSettings.Info.access_token, res['access_token']);
					localStorage.setItem(GlobalSettings.Info.refresh_token, res['refresh_token'] ? res['refresh_token'] : refToken);
					localStorage.setItem(GlobalSettings.Info.last_login, (new Date().getTime()).toString());
					resp.next('OK');
					resp.complete();
				}, error => {
					resp.error(error);
				});
		});
	}

	logout() {
		// const baseUrl = this.shared.RootEndPointAPI + `/SEAccount/logout`;
		const baseUrl = '';
		return this.service.getRequestBaseUrl(baseUrl);
	}

	/*Error */
	handleError(methodName: string, errorData: HttpErrorResponse | any) {
		let errorResponse: any = {
			status: 0,
			message: ''
		};
		if (errorData.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			let messageError = `Method: ${methodName}. An error occurred: ${errorData.error.message}`;
			console.error(messageError);
			errorResponse.message = messageError;
			return throwError(errorResponse);
		}
		// The backend returned an unsuccessful response code.
		// The response body may contain clues as to what went wrong,
		let errMsg: string;
		if (errorData.status && errorData.error) {
			let errorObject = errorData;
			while (errorObject['error']) {
				errorObject = errorObject['error'];
			}
			errorData = errorObject;
			if (errorData.error_description) {
				console.error(`Method: ${methodName}. Message: ${errorData.error_description}`);
				errorResponse.error_description = errorData.error_description;
				errorResponse.status = errorData.status;
				if (errorData.status === 404) {
					errMsg = errorData.statusText;
				}
				else {
					errMsg = errorData.error_description;
				}
			}
			else if (errorData.innererror) {
				if (errorData.innererror.message.includes('ACCESS_DENIED')) {
					errorResponse.error = errorData;
					errorResponse.message = errorData.innererror.message;
				}
			}
			else if (errorData.message) {
				console.error(`Method: ${methodName}. Message: ${errorData.message}`);
				errorResponse.error_description = errorData.message;
				errorResponse.status = errorData.status;
				if (errorData.status === 404) {
					errMsg = errorData.statusText;
				}
				else {
					errMsg = errorData.message;
				}
			}
			else if (errorData.innererror &&
				errorData.innererror.message) {
				console.error(`Method: ${methodName}. Message: ${errorData.innererror.message}`);
				errorResponse.error_description = errorData.innererror.message;
				errorResponse.status = errorData.status;
				errMsg = errorData.innererror.message;
			}
			else {
				console.error(`Method: ${methodName}. Message: ${errorData.error}`);
				errorResponse.error_description = errorData.error;
				errorResponse.status = errorData.status;
				if (errorData.status === 404) {
					errMsg = errorData.statusText;
				}
				else {
					errMsg = errorData.error;
				}
			}
		}
		else {
			console.error(`Method: ${methodName}. Stack: ${errorData.stack}`);
			errorResponse.error_description = errorData.stack;
			errMsg = errorData.message;
		}
		errorResponse.error = errorData;
		errorResponse.message = errMsg;
		return throwError(errorResponse);
	};
}
