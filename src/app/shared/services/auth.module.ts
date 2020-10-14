import { NgModule, Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SharedPropertyService } from './shared-property.service';
import { SharedService } from '../shared.service';
import { GlobalSettings } from '../global.settings';
import { CommonUtility } from '../common.utility';

@NgModule({
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthModule,
        multi: true
    }],
})

@Injectable({
    providedIn: 'root'
})
export class AuthModule implements HttpInterceptor {
    constructor(public router: Router,
        public service: SharedService,
        public sharedService: SharedPropertyService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = req.url;
        //Skip authen
        if (url.includes('oauth2/Token') || url.includes('/oauth') || url.includes('/signin')) {
            return next.handle(req.clone());
        }
        else if (url.includes('assets/')) {
            const authReq = req.clone({
                headers: req.headers.set('Cache-Control', 'public;max-age=7200')
            });
            return next.handle(authReq);
        }
        else if (url.includes('/SECommons/AuthShareLiveLink') ||
            url.includes('/SETargets/SE.GetLiveLinkAuth') ||
            url.includes('/SECommons/AuthShareLiveLinkWowza') ||
            url.includes('/SECommons/GetShareLiveLinkWowza')) {
            const authReq = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
            return next.handle(authReq);
        }
        let token = localStorage.getItem(GlobalSettings.Info.access_token);
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
        return this.newRequest(next, authReq);
    }

    newRequest(next: HttpHandler, authReq: any) {
        return next.handle(authReq).pipe(tap(event => {
            if (event instanceof HttpResponse) {
            }
        }, error => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    if (!this.sharedService.isLiveMap()) {
                        this.sharedService.sharedData({ action: 'user-unauthorized' });
                    }
                    let strCode = localStorage.getItem(GlobalSettings.Info.code_token);
                    let strState = localStorage.getItem(GlobalSettings.Info.state_token);
                    if (CommonUtility.isNullOrEmpty(strState)) {
                        strState = CommonUtility.getGuid();
                        strState = strState.replace(/-/g, '').substring(20);
                    }
                    if (!CommonUtility.isNullOrEmpty(strCode)) {
                        this.router.navigate(['oauth'], { queryParams: { code: strCode, state: strState } });
                    }
                    else {
                        window.location.href = CommonUtility.getOAuthenticationUrl();
                    }
                }
                else {
                    if (error.message.includes('ACCESS_DENIED')) {
                        this.router.navigate(['/access-denied']);
                    }
                }
            }
        }));
    }
}
