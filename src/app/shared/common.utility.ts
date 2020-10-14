import { GlobalSettings } from './global.settings';
import { JwtHelper } from './jwthelper';
import 'moment';
import * as moment from 'moment-timezone';
import { environment } from '../../environments/environment';

export class CommonUtility {
    constructor() {
    }

    static isNullOrEmpty(data: any) {
        if (data === null || data === '' || data === undefined) {
            return true;
        }
        return false;
    }

    static parseOffsetTimezone(offset: any) {
        if (offset) {
            if (typeof offset === 'number') {
                return offset;
            }
            let arrOffset = offset.split('.');
            if (arrOffset.length > 1) {
                return parseFloat(arrOffset[0] || 0) + (parseFloat(arrOffset[1] || 0) / 60);
            }
            return parseFloat(arrOffset[0] || 0);
        }
        return 0;
    }

    static convertDateStringToMoment(data: string, offset, isDST: any) {
        if (!this.isNullOrEmpty(data)) {
            let date: any = moment(data);
            let currentTimezone = CommonUtility.parseOffsetTimezone(offset) * 60;
            let timezone = date._offset;
            let timespan = 0;
            if (currentTimezone !== timezone) {
                timespan = 0 - (currentTimezone - timezone);
            }
            if ((!isDST || isDST === 0) && date.isDST()) {
                date.subtract(timespan, 'm');
            }
            return date;
        }
        return null;
    }

    static getUserId() {
        const token = localStorage.getItem(GlobalSettings.Info.access_token);
        if (!this.isNullOrEmpty(token)) {
            const tokenDecode = JwtHelper.decodeToken(token);
            for (let item in tokenDecode) {
                if (item === 'nameid') {
                    return tokenDecode[item];
                }
            }
        }
        return 0;
    }

    static handleReplaceQuote(event: any, formGroup: any): void {
        const backQuote = '`'
        if (event && event.which === 39) {
            let controlName = event.target.attributes.formControlName.value
            setTimeout(() => {
                let value = event.target.value
                let indexQuote = value.indexOf(`'`)
                let newString = value.substring(0, indexQuote) + backQuote + value.substring(indexQuote + 1)
                formGroup.get(controlName).setValue(newString)
            }, 250);
        }
    }

    static getGlobalConfig() {
        let globalConfig = {};
        const token = localStorage.getItem(
            GlobalSettings.Info.access_token
        );
        if (!this.isNullOrEmpty(token)) {
            const tokenDecode = JwtHelper.decodeToken(token);
            for (let item in tokenDecode) {
                if (item.lastIndexOf("/") !== -1) {
                    const lastIndexOf = item.lastIndexOf("/");
                    const key = item.substring(lastIndexOf + 1);
                    globalConfig[key] = tokenDecode[item];
                } else {
                    globalConfig[item] = tokenDecode[item];
                }
            }
        }
        return globalConfig;
    }

    static getGuid() {
        return ("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(/[xy]/g, function (
            c
        ) {
            var r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    static getOAuthenticationUrl() {
        // Get Current Domain Site
        let redirect_uri = encodeURIComponent(window.location.origin + '/oauth');
        let state = this.getGuid();
        state = state.replace(/-/g, '').substring(20);
        let oauth = GlobalSettings.Info.Server;
        if (environment.production) {
            oauth = './';
        }
        return `${oauth}/v2/web/oauth2/authorize?client_id=${GlobalSettings.Info.Account.id}&redirect_uri=${redirect_uri}&state=${state}&scope=default&response_type=code`;
    }
}