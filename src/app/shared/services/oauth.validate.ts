import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';
import { CommonUtility } from '../common.utility';
import { GlobalSettings } from '../global.settings';
import { SharedPropertyService } from './shared-property.service';

@Injectable({
    providedIn: 'root'
})

export class OAuthValidate implements CanActivate {
    constructor(
        public router: Router,
        public shared: SharedPropertyService,
        public service: SharedService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable(obs => {
            console.log(obs);            
            // let sub = this.service.loggedIn();
            // sub.subscribe((result: any) => {
            //     if (result) {
            //         obs.next(true);
            //         obs.complete();
            //     }
            //     else {
            //         let strCode = localStorage.getItem(GlobalSettings.Info.code_token);
            //         let strState = localStorage.getItem(GlobalSettings.Info.state_token);
            //         if (CommonUtility.isNullOrEmpty(strState)) {
            //             strState = CommonUtility.getGuid();
            //             strState = strState.replace(/-/g, '').substring(20);
            //         }
            //         if (!CommonUtility.isNullOrEmpty(strCode)) {
            //             let account: any = {
            //                 code: strCode
            //             };
            //             sub = this.service.loginCode(account);
            //             sub.subscribe((res: any) => {
            //                 localStorage.setItem(GlobalSettings.Info.state_token, strState);
            //                 localStorage.setItem(GlobalSettings.Info.code_token, strCode);
            //                 localStorage.setItem(GlobalSettings.Info.access_token, res['access_token']);
            //                 localStorage.setItem(GlobalSettings.Info.refresh_token, res['refresh_token']);
            //                 localStorage.setItem(GlobalSettings.Info.last_login, (new Date().getTime()).toString());
            //                 obs.next(true);
            //                 obs.complete();
            //             },
            //                 error => {
            //                     this.shared.resetUserToken();
            //                     obs.next(false);
            //                     obs.complete();
            //                 });
            //         }
            //         else {
            //             window.location.href = CommonUtility.getOAuthenticationUrl();
            //             obs.next(false);
            //             obs.complete();
            //         }
            //     }
            // });
        });
    }
}
