import { Injectable } from "@angular/core";
import { IService } from "./iservice";
import { Observable, Subject } from "rxjs";
import { HttpHeaders, HttpResponse, HttpClient, HttpRequest } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})

export class HttpService implements IService {
	constructor(private http: HttpClient) {
	}

	getItems<T>(url: string, options?: any): Observable<HttpResponse<T>> {
		let headers = new HttpHeaders();
		headers = headers.set("Content-Type", "application/json;charset=utf-8");
		headers = headers.set("Accept", "application/json");
		let queryStr = "";
		let headerStr = "";
		if (options) {
			queryStr = `$count=true`;
			if (options.top) {
				let top = options.top;
				top = top < 0 ? 1 : top;
				queryStr += `&$top=${top}`;
			}
			if (options.skip) {
				let skip = options.skip;
				skip = skip < 0 ? 0 : skip;
				queryStr += `&$skip=${skip}`;
			}
			if (options.select) {
				queryStr += `&$select=${options.select}`;
			}
			if (options.sort) {
				queryStr += `&$orderby=${options.sort}`;
			}
			if (options.filter) {
				queryStr += `&$filter=${options.filter}`;
			}
			if (options.expand) {
				queryStr += `&$expand=${options.expand}`;
			}
			if (options.extFilter) {
				queryStr += `&${options.extFilter}`;
			}
			if (options.ids) {
				headers = headers.set("X-SEV2-SubSiteID", options.ids);
			}
			if (options.proIds) {
				headers = headers.set("X-SEV2-ProjetID", options.proIds);
			}
			if (options.deviceIds) {
				if (options.deviceIds.targetID) {
					headers = headers.set("X-SEV2-TargetID", options.deviceIds.targetID);
				}
				if (options.deviceIds.cameraID) {
					headers = headers.set("X-SEV2-CameraID", options.deviceIds.cameraID);
				}
				if (options.deviceIds.genetecID) {
					headers = headers.set("X-SEV2-GenetecID", options.deviceIds.genetecID);
				}
			}
			if (options.header) {
				headerStr = this.getReportHeader(options);
				if (options.header.isExport) {
					headerStr = `report='${options.header.report}'~extension='${options.header.extension}'~fileName =''~` + headerStr;
				}
				if (!this.isNullOrEmpty(options.header.runWorkerAsyn)) {
					headerStr = `'runWorkerAsyn=${options.header.runWorkerAsyn}~` + headerStr;
				}
				headers = headers.set("X-REPORT", headerStr);
			}
		}
		let baseUrl = `${url}`;
		if (queryStr) {
			baseUrl = `${url}?${queryStr}`;
		}
		return this.http.get<HttpResponse<T>>(baseUrl, { headers: headers });
	}

	isNullOrEmpty(data) {
		if (data === null || data === "" || data === undefined) {
			return true;
		}
		return false;
	}

	isUndefinedOrEmpty(value) {
		return value === undefined || value === "";
	}

	getReportHeader(options: any) {
		let headerStr = "";
		let head = options.header;
		headerStr += `targetIds='${head.targetIds}'` + `~`;
		if (head.startDate) {
			headerStr += `startDate='${head.startDate}'` + `~`;
		}
		else {
			headerStr += `startDate=${head.startDate}` + `~`;
		}
		if (head.endDate) {
			headerStr += `endDate='${head.endDate}'` + `~`;
		}
		else {
			headerStr += `endDate=${head.endDate}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.userOffset)) {
			headerStr += `userOffset=${head.userOffset}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.motion)) {
			headerStr += `motion=${head.motion}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.speedMin)) {
			headerStr += `speedMin=${head.speedMin}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.speedMax)) {
			headerStr += `speedMax=${head.speedMax}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.stopMin)) {
			headerStr += `stopMin=${head.stopMin}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.stopMax)) {
			headerStr += `stopMax=${head.stopMax}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.stopDistance)) {
			headerStr += `stopDistance=${head.stopDistance}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.stopTime)) {
			headerStr += `stopTime=${head.stopTime}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.includeAlert)) {
			headerStr += `includeAlert=${head.includeAlert}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.topRecords)) {
			headerStr += `topRecords=${head.topRecords}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.includeEvent)) {
			headerStr += `includeEvent=${head.includeEvent}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.includeInvalidGPS)) {
			headerStr += `includeInvalidGPS=${head.includeInvalidGPS}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.lowerStopSpeedConfig)) {
			headerStr += `lowerStopSpeedConfig=${head.lowerStopSpeedConfig}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.upperStopSpeedConfig)) {
			headerStr += `upperStopSpeedConfig=${head.upperStopSpeedConfig}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.timeStoppedConfig)) {
			headerStr += `timeStoppedConfig=${head.timeStoppedConfig}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.adj)) {
			headerStr += `adj=${head.adj}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.measurment)) {
			headerStr += `measurment='${head.measurment}'` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.motionFilter)) {
			headerStr += `motionFilter=${head.motionFilter}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.eventType)) {
			if (head.eventType != null) {
				headerStr += `eventType='${head.eventType}'` + `~`;
			}
			else {
				headerStr += `eventType=${head.eventType}` + `~`;
			}
		}
		if (!this.isNullOrEmpty(head.timeZoneSelect)) {
			headerStr += `timeZoneSelect=${head.timeZoneSelect}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.searchText)) {
			headerStr += `searchText=${head.searchText}` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.dateTimeFormat)) {
			headerStr += `dateTimeFormat='${head.dateTimeFormat}'` + `~`;
		}
		if (!this.isUndefinedOrEmpty(head.dayOfWeek)) {
			if (head.dayOfWeek !== null)
				headerStr += `dayOfWeek='${head.dayOfWeek}'`;
			else
				headerStr += `dayOfWeek=${head.dayOfWeek}`;
		}
		const reg = /(~)$/;
		return headerStr.replace(reg, "");
	}

	getItemsNoPaging<T>(url: string, options?: any, options2?: any): Observable<HttpResponse<T>> {
		let headers = new HttpHeaders();
		headers = headers.set("Content-Type", "application/json;charset=utf-8");
		headers = headers.set("Accept", "application/json");
		let queryStr = "";
		let headerStr = "";
		if (options) {
			queryStr = `$count=true`;
			if (options.top) {
				let top = options.top;
				top = top < 0 ? 1 : top;
				queryStr += `&$top=${top}`;
			}
			if (options.skip) {
				let skip = options.skip;
				skip = skip < 0 ? 0 : skip;
				queryStr += `&$skip=${skip}`;
			}
			if (options.select) {
				queryStr += `&$select=${options.select}`;
			}
			if (options.sort) {
				queryStr += `&$orderby=${options.sort}`;
			}
			if (options.filter) {
				queryStr += `&$filter=${options.filter}`;
			}
			if (options.expand) {
				queryStr += `&$expand=${options.expand}`;
			}
		}
		if (options2) {
			if (options2.header) {
				headerStr = this.getReportHeader(options2);
				headers = headers.set("X-REPORT", headerStr);
			}
			if (options2.ids) {
				headers = headers.set("X-SEV2-SubSiteID", options2.ids);
			}
			if (options2.proIds) {
				headers = headers.set("X-SEV2-ProjetID", options2.proIds);
			}
		}
		let baseUrl = `${url}`;
		if (queryStr) {
			baseUrl = `${url}?${queryStr}`;
		}
		return this.http.get<HttpResponse<T>>(baseUrl, { headers: headers, });
	}

	getItem<T>(url: string, id?: number, options?: any): Observable<T> {
		let headers = new HttpHeaders();
		headers = headers.set("Content-Type", "application/json;charset=utf-8");
		let queryStr = "";
		let headerStr = "";
		if (options) {
			if (options.select) {
				queryStr += `&$select=${options.select}`;
			}
			if (options.filter) {
				queryStr += `&$filter=${options.filter}`;
			}
			if (options.expand) {
				queryStr += `&$expand=${options.expand}`;
			}
			if (options.sort) {
				queryStr += `&$orderby=${options.sort}`;
			}
			if (options.top) {
				queryStr += `&$count=true`;
				let top = options.top;
				top = top < 0 ? 1 : top;
				queryStr += `&$top=${top}`;
			}
			if (options.skip) {
				let skip = options.skip;
				skip = skip < 0 ? 0 : skip;
				queryStr += `&$skip=${skip}`;
			}
			if (options.header) {
				headerStr = this.getReportHeader(options);
				if (options.header.isExport) {
					headerStr = `report='${options.header.report}'~extension='${options.header.extension}'~fileName =''~` + headerStr;
				}
				if (options.header.offsetClient) {
					headerStr = `offsetClient='${options.header.offsetClient}'~` + headerStr;
				}
				if (!this.isNullOrEmpty(options.header.runWorkerAsyn)) {
					headerStr = `'runWorkerAsyn =${options.header.runWorkerAsyn}~` + headerStr;
				}
				headers = headers.set("X-REPORT", headerStr);
			}
		}
		let baseUrl = url;
		if (id) {
			baseUrl = baseUrl + "(" + id + ")";
		}
		if (queryStr) {
			baseUrl = baseUrl + "?" + queryStr;
		}
		return this.http.get<T>(baseUrl, { headers: headers });
	}

	addItem<T>(url: string, item: T): Observable<any> {
		let headers = new HttpHeaders();
		headers = headers.set("Content-Type", "application/json");
		const baseUrl = `${url}`;
		const odataUser = JSON.stringify(item);
		return this.http.post(baseUrl, odataUser, { headers: headers });
	}

	updateItem<T>(url: string, item: T, id: number): Observable<any> {
		let headers = new HttpHeaders();
		headers = headers.set("Content-Type", "application/json");
		const baseUrl = `${url}(${id})`;
		const odataUser = JSON.stringify(item);
		return this.http.patch(baseUrl, odataUser, { headers: headers });
	}

	updateCamera<T>(url: string, item: T, id: number): Observable<any> {
		let headers = new HttpHeaders();
		headers = headers.set("Content-Type", "application/json-patch");
		const baseUrl = `${url}(${id})`;
		const odataUser = JSON.stringify(item);
		return this.http.patch(baseUrl, odataUser, { headers: headers });
	}

	deleteItem(url: string, id: number): Observable<any> {
		let headers = new HttpHeaders();
		headers = headers.set("Content-Type", "application/json");
		const baseUrl = `${url}(${id})`;
		return this.http.delete(baseUrl, { headers: headers });
	}

	existsItem<T, K>(url: string, fieldName: string, fieldValue: T): Observable<Array<K>> {
		let headers = new HttpHeaders();
		headers = headers.set("Content-Type", "application/json,odata.metadata=minimal");
		headers = headers.set("Accept", "application/json");
		const baseUrl = `${url}?$count=true&$filter=${fieldName} eq '${fieldValue}'`;
		return this.http.get<Array<K>>(baseUrl, { headers: headers });
	}

	exportExcel(url: string): Observable<any> {
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/octet-stream');
		return this.http.get(url, { headers: headers, responseType: 'blob' });
	}

	importExcel(url: string, fileInfo: any): Observable<any> {
		return this.http.post(url, fileInfo, { responseType: 'json' });
	}

	getRequestBaseUrl(url: string, headers?: any): Observable<HttpResponse<any>> {
		if (this.isNullOrEmpty(headers)) {
			headers = new HttpHeaders();
		}
		headers = headers.set("Content-Type", "application/json");
		return this.http.get(url, { headers: headers, observe: 'response' });
	}

	postRequestBaseUrl(url: string, headers: HttpHeaders, params?: any): Observable<any> {
		if (headers === null) {
			headers = new HttpHeaders();
			headers = headers.set("Content-Type", "application/json;charset=utf-8");
		}
		if (params !== null && params !== undefined) {
			return this.http.post(url, params, { headers: headers });
		}
		return this.http.post(url, { headers: headers });
	}

	uploadFile(url: string, headers: HttpHeaders, formData: any): Observable<any> {
		// create a http-post request and pass the form
		// tell it to report the upload progress
		const req = new HttpRequest('POST', url, formData, {
			reportProgress: true
		});
		// create a new progress-subject for every file
		const progress = new Subject<number>();
		// send the http-request and subscribe for progress-updates
		return this.http.request(req);
	}

	postRequestBaseUrl2(url: string, options?: any, params?: any): Observable<any> {
		if (options === null) {
			let headers = new HttpHeaders();
			headers = headers.set("Content-Type", "application/json;charset=utf-8");
			options = { headers: headers, responseType: "text" };
		}
		if (params !== null && params !== undefined) {
			return this.http.post(url, params, options);
		}
		return this.http.post(url, options);
	}
}