import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

export interface IService {
    getItems<T>(url: string, options?: any): Observable<HttpResponse<T>>;
    getItemsNoPaging<T>(url: string, options?: any): Observable<HttpResponse<T>>;
    getItem<T>(url: string, id: number, options?: any): Observable<T>;
    updateItem<T>(url: string, item: T, id: number): Observable<any>;
    addItem<T>(url: string, item: T): Observable<any>;
    deleteItem(url: string, id: number): Observable<any>;
    existsItem<T, K>(url: string, fieldName: string, fieldValue: T): Observable<Array<K>>;
    getRequestBaseUrl(url: string):Observable<HttpResponse<any>>;
    postRequestBaseUrl(url: string, params?: any):Observable<any>;
    postRequestBaseUrl2(url: string, options?: any, params?: any):Observable<any>;
    exportExcel(url: string): Observable<any>;
}