import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedPropertyService } from './shared-property.service';
import { GlobalSettings } from '../global.settings';
import { SharedService } from '../shared.service';
import { CommonUtility } from '../common.utility';

@Injectable({
    providedIn: 'root'
})

export class OAuthSuperAdminValidate implements CanActivate {
    constructor(public router: Router,
        public service: SharedService,
        public sharedProperty: SharedPropertyService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Observable(obs => {
            console.log(obs);            
            // this.service.loggedIn().subscribe((result: any) => {
            //     if (result) {
            //         this.getGlobalConfig();
            //         if (!this.sharedProperty.GlobalConfig.isSystemAdmin) {
            //             this.router.navigate(['/' + GlobalSettings.Info.Server]);
            //             obs.next(false);
            //             obs.complete();
            //             return;
            //         }
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
            //             this.router.navigate(['oauth'], { queryParams: { code: strCode, state: strState } });
            //         }
            //         else {
            //             window.location.href = CommonUtility.getOAuthenticationUrl();
            //         }
            //         obs.next(false);
            //         obs.complete();
            //     }
            // });
        });
    }

    getGlobalConfig() {
        if (this.sharedProperty.isNullOrEmpty(this.sharedProperty.GlobalConfig)) {
            this.sharedProperty.GlobalConfig = this.sharedProperty.getGlobalConfig();
            this.sharedProperty.GlobalConfig.isSystemAdmin = (this.sharedProperty.GlobalConfig.isSystemAdmin === 'True' || this.sharedProperty.GlobalConfig.isSystemAdmin === 'true') ? true : false;
        }
    }
}
