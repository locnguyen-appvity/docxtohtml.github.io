import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'moment';
import * as moment_ from 'moment-timezone';
import { GlobalSettings } from '../global.settings';
const moment = moment_;
declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class SharedPropertyService {
    constructor() {
    }

    private _isExpiredLogIn: boolean = true;
    get IsExpiredLogIn(): boolean {
        return this._isExpiredLogIn;
    }

    set IsExpiredLogIn(_isExpiredLogIn: boolean) {
        this._isExpiredLogIn = _isExpiredLogIn;
    }

    private viewMode: string = '';
    get ViewMode(): string {
        return this.viewMode;
    }

    set ViewMode(mode: string) {
        this.viewMode = mode;
    }

    private target: string = '';
    set Target(target: string) {
        this.target = target;
    }

    get Target() {
        return this.target;
    }

    private currentState: any;
    set CurrentState(currentState: any) {
        this.currentState = currentState;
    }

    get CurrentState() {
        return this.currentState;
    }

    private canChangedTab: boolean = true;
    get CanChangedTab(): boolean {
        return this.canChangedTab;
    }

    set CanChangedTab(canChangedTab: boolean) {
        this.canChangedTab = canChangedTab;
    }

    private selectedIndex: number = 0;
    get TabSelectedIndex(): number {
        return this.selectedIndex;
    }

    set TabSelectedIndex(index: number) {
        this.selectedIndex = index;
    }

    private _globalConfig: any;
    get GlobalConfig(): any {
        return this._globalConfig;
    }

    set GlobalConfig(value: any) {
        this._globalConfig = value;
    }

    private currentUTCTimezone: string = '';
    get CurrentUTCTimezone(): string {
        return this.currentUTCTimezone;
    }

    set CurrentUTCTimezone(value: string) {
        this.currentUTCTimezone = value;
    }

    private currentTimezone: any;
    get CurrentTimezone(): any {
        return this.currentTimezone;
    }

    set CurrentTimezone(value: any) {
        this.currentTimezone = value;
    }

    private _rootMediaEndPoint: string = '';
    get RootMediaEndPoint() {
        return this._rootMediaEndPoint;
    }

    set RootMediaEndPoint(rootMediaEndPoint) {
        this._rootMediaEndPoint = rootMediaEndPoint;
    }

    private _rootSiteEndPoint: string = '';
    get RootSiteEndPoint() {
        return this._rootSiteEndPoint;
    }

    set RootSiteEndPoint(rootSiteEndPoint) {
        this._rootSiteEndPoint = rootSiteEndPoint;
    }

    private _rootEndPointAPI: string = '';
    get RootEndPointAPI() {
        return this._rootEndPointAPI;
    }

    set RootEndPointAPI(rootEndPointAPI) {
        this._rootEndPointAPI = rootEndPointAPI;
    }

    private _rootEndPoint: string = '';
    get RootEndPoint() {
        return this._rootEndPoint;
    }

    set RootEndPoint(rootEndPoint) {
        this._rootEndPoint = rootEndPoint;
    }

    private _rootAuth: string = '';
    get RootAuth() {
        return this._rootAuth;
    }

    set RootAuth(rootAuth) {
        this._rootAuth = rootAuth;
    }

    private _rootAPIVersion: string = '';
    get RootAPIVersion() {
        return this._rootAPIVersion;
    }

    set RootAPIVersion(rootAPIVersion) {
        this._rootAPIVersion = rootAPIVersion;
    }

    // Observable any sources
    private dataItem = new Subject<any>();
    // Observable any streams
    dataItemObs = this.dataItem.asObservable();
    // Service message commands
    sharedData(data: any) {
        /*data = {
            action: action (string),
            data: data(any)
        } */
        this.dataItem.next(data);
    }

    isLoginForm() {
        let currentUrl = window.location.href;
        currentUrl = currentUrl.split('?')[0];
        if (this.isNullOrEmpty(currentUrl)) {
            return true;
        }
        if (currentUrl.endsWith('oauth')) {
            return true;
        }
        return false;
    }

    isLiveMap() {
        let currentUrl = window.location.href;
        currentUrl = currentUrl.split('?')[0];
        if (currentUrl.endsWith('welcome-page')) {
            return true;
        }
        return false;
    }

    isForgetPass() {
        let currentUrl = window.location.href;
        currentUrl = currentUrl.split('?')[0];
        if (currentUrl.includes('/signin/forget-password') || currentUrl.includes('/signin/new-password') || currentUrl.includes('/signin/code-via-email')) {
            return true;
        }
        return false;
    }

    getGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    getGoogleAPI() {
        return 'https://maps.googleapis.com/maps/api';
    }

    getDate(): Date {
        return new Date();
    }

    getCurrentUrl(currentUrl: string) {
        currentUrl = decodeURIComponent(currentUrl);
        currentUrl = currentUrl.split('?')[0];
        if (currentUrl === '/' || currentUrl === '/oauth' || currentUrl === 'oauth') {
            return '';
        }
        currentUrl = encodeURIComponent(currentUrl);
        return currentUrl;
    }

    copyArray(data: Array<any>) {
        let arrData = [];
        data.forEach((x) => {
            arrData.push(Object.assign({}, x));
        });
        return arrData;
    }

    escape(string: any) {
        let entityMap = {
            "'": '`'
        };
        return String(string).replace(/'/g, function (s) {
            return entityMap[s];
        });
    }

    isNullOrEmpty(data: any) {
        if (data === null || data === '' || data === undefined) {
            return true;
        }
        return false;
    }

    isNullOrEmptyZero(data: any) {
        if (data === null || data === '' || data === undefined || data === 0) {
            return true;
        }
        return false;
    }

    isNullOrUndefined(data: any) {
        if (data === null || data === undefined) {
            return true;
        }
        return false;
    }

    getDateFormatted(date: any) {
        let today = new Date();
        //Get total times 
        const today_ms = today.getTime();
        const date_ms = date.toDate().getTime();
        //Total times of one day
        const one_day = 1000 * 60 * 60 * 24;
        const diff = today_ms - date_ms;
        const days = Math.round(diff / one_day);
        if (days < 1) {
            return 'Today';
        }
        else if (days === 1) {
            return 'Yesterday';
        }
        else if (days < 15) {
            return `${days} days ago`;
        }
        return date.format(GlobalSettings.Info.DateTime.shortDatePattern5);
    }

    getDateTimeFormatted(date: any) {
        let strdate = moment(date._d).format(GlobalSettings.Info.DateTime.dateTimePattern);
        const date_ms = new Date(strdate).getTime();
        //Today 
        let now = new Date();
        let today: any = moment(now.toUTCString());
        //Get server datetime
        today = moment(today._a);
        let strtoday = moment(today._d).format(GlobalSettings.Info.DateTime.dateTimePattern);
        const today_ms = new Date(strtoday).getTime();
        let difference_ms = today_ms - date_ms;
        //Total times of one day
        const one_day = 24 * 60 * 60 * 1000;
        const diff = today_ms - date_ms;
        const days = Math.round(diff / one_day);
        let time = moment(date._d).format(GlobalSettings.Info.DateTime.timePatternAM);
        if (days < 1) {
            return `Today, ${time}`;
        }
        else if (days === 1) {
            return `Yesterday, ${time}`;
        }
        else if (days < 5) {
            return `${days} days ago, ${time}`;
        }
        return date.format(GlobalSettings.Info.DateTime.dateTimePattern1);
    }

    getDateTimeFormatted2(date: any, offset: any, isDST: any) {
        let currentTimezone = this.parseOffsetTimezone(offset) * 60;
        let timezone = date._offset;
        let timespan = 0;
        if (currentTimezone !== timezone) {
            timespan = 0 - (currentTimezone - timezone);
        }
        let strdate = date.format(GlobalSettings.Info.DateTime.dateTimePattern);
        const date_ms = new Date(strdate).getTime();
        //Today 
        let now = new Date();
        let today: any = moment(now.toUTCString());
        if ((!isDST || isDST === 0) && today.isDST()) {
            today.subtract(timespan, 'm');
        }
        let strtoday = today.format(GlobalSettings.Info.DateTime.dateTimePattern);
        const today_ms = new Date(strtoday).getTime();
        let difference_ms = today_ms - date_ms;
        //Total times of one day
        const one_day = 24 * 60 * 60 * 1000;
        const diff = today_ms - date_ms;
        const days = Math.round(diff / one_day);
        if (days < 1) {
            return `Today`;
        }
        if (days === 1) {
            return `Yesterday`;
        }
        if (days <= 5) {
            return `${days} days ago`;
        }
        return date.format(GlobalSettings.Info.DateTime.shortDatePattern1);
    }

    renderDatePattern(difference_ms: any) {
        const one_second = 1000;
        const one_min = one_second * 60;
        const one_hour = one_min * 60;
        const one_day = one_hour * 24;

        const days = Math.floor(difference_ms / one_day);
        const totalHours = difference_ms % one_day;
        let hours = Math.floor(totalHours / one_hour);
        if (days > 0) {
            return days + 'd' + ' ' + hours + 'h';
        }
        let totalMins = totalHours % one_hour;
        let mins = Math.floor(totalMins / one_min);
        mins = mins < 0 ? 0 : mins;
        if (hours > 0) {
            return hours + 'h' + ' ' + mins + 'm';
        }
        else {
            totalMins = totalMins < 0 ? totalMins * -1 : totalMins;
            const totalSeconds = totalMins % one_min;
            const seconds = Math.floor(totalSeconds / one_second);
            return mins + 'm' + ' ' + seconds + 's';
        }
    }

    getGlobalConfig() {
        let globalConfig = {};
        const token = localStorage.getItem(GlobalSettings.Info.access_token);
        if (!this.isNullOrEmpty(token)) {
            const tokenDecode = this.decodeToken(token);
            for (let item in tokenDecode) {
                if (item.lastIndexOf('/') !== -1) {
                    const lastIndexOf = item.lastIndexOf('/');
                    const key = item.substring(lastIndexOf + 1);
                    globalConfig[key] = tokenDecode[item];
                }
                else {
                    globalConfig[item] = tokenDecode[item];
                }
            }
        }
        return globalConfig;
    }

    getTimezone() {
        const token = localStorage.getItem(GlobalSettings.Info.access_token);
        if (!this.isNullOrEmpty(token)) {
            const tokenDecode = this.decodeToken(token);
            for (let item in tokenDecode) {
                if (item.lastIndexOf('/offset') !== -1) {
                    return parseFloat(tokenDecode[item] || '0') * 60;
                }
            }
        }
        return null;
    }

    convertDateStringToMoment(data: string, offset, isDST: any) {
        if (!this.isNullOrEmpty(data)) {
            let date: any = moment(data);
            let currentTimezone = this.parseOffsetTimezone(offset) * 60;
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

    getUserId() {
        const token = localStorage.getItem(GlobalSettings.Info.access_token);
        if (!this.isNullOrEmpty(token)) {
            const tokenDecode = this.decodeToken(token);
            for (let item in tokenDecode) {
                if (item === 'nameid') {
                    return tokenDecode[item];
                }
            }
        }
        return 0;
    }

    getDataKeyValue(key) {
        const token = localStorage.getItem(GlobalSettings.Info.access_token);
        if (!this.isNullOrEmpty(token)) {
            const tokenDecode = this.decodeToken(token);
            for (let item in tokenDecode) {
                if (item.lastIndexOf('/' + key) !== -1) {
                    return tokenDecode[item];
                }
            }
        }
        return null;
    }

    convertDirection(direction: number) {
        const directions = 'N|NNE|NE|ENE|E|ESE|SE|SSE|S|SSW|SW|WSW|W|WNW|NW|NNW';
        const dirArray: Array<string> = directions.split('|');
        let heading = 'n/a';
        try {
            direction = Math.round(direction / 22.5);
            if (direction >= 16) {
                direction = 15;
            }
            if (direction < 0) {
                direction = 0;
            }
            heading = dirArray[direction];
        } catch (Exception) { }
        return heading;
    }

    getBearing(startLat: number, startLong: number, endLat: number, endLong: number) {
        startLat = this.getRadians(startLat);
        startLong = this.getRadians(startLong);
        endLat = this.getRadians(endLat);
        endLong = this.getRadians(endLong);

        let dLong = endLong - startLong;

        const dPhi = Math.log(Math.tan(endLat / 2.0 + Math.PI / 4.0) / Math.tan(startLat / 2.0 + Math.PI / 4.0));
        if (Math.abs(dLong) > Math.PI) {
            if (dLong > 0.0) {
                dLong = -(2.0 * Math.PI - dLong);
            }
            else {
                dLong = (2.0 * Math.PI + dLong);
            }
        }

        return (this.getDegrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
    }

    getRadians(n) {
        return n * (Math.PI / 180);
    }

    getDegrees(n) {
        return n * (180 / Math.PI);
    }

    getSessionID() {
        const token = localStorage.getItem(GlobalSettings.Info.access_token);
        if (!this.isNullOrEmpty(token)) {
            const tokenDecode = this.decodeToken(token);
            for (let item in tokenDecode) {
                if (item.lastIndexOf('/ssid') !== -1) {
                    return tokenDecode[item];
                }
            }
        }
    }

    convertCssShapeToCssStyle(cssShape: any) {
        let cssStyle = '';
        for (let css in cssShape) {
            cssStyle += css + ':' + cssShape[css] + ';';
        }
        return cssStyle;
    }
    /**
 * Returns camel-cased from string 'Foo Bar' to 'fooBar'
 */
    toCamelCase(str: string): string {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }

    bindValueToExpiration(maxValue: number) {
        let timespanValue = [];
        let itimer = 1;
        while (itimer <= maxValue) {
            timespanValue.push({
                value: itimer.toString(),
                text: itimer.toString()
            })
            itimer += 1;
        }
        return timespanValue;
    }

    bindValueToUnit() {
        let timespanUnit = [];
        timespanUnit.push({ value: 'Minutes', text: 'Minutes' });
        timespanUnit.push({ value: 'Hours', text: 'Hours' });
        timespanUnit.push({ value: 'Days', text: 'Days' });
        return timespanUnit;
    }

    getValueSkipNull(value) {
        if (this.isNullOrEmpty(value)) {
            return '';
        }
        return value;
    }

    getHours(hours) {
        return hours.toString().length === 1 ? ('0' + hours.toString()) : hours.toString();
    }

    getMinutes(minutes) {
        return minutes.toString().length === 1 ? ('0' + minutes.toString()) : minutes.toString();
    }
    getSeconds(seconds) {
        return seconds.toString().length === 1 ? ('0' + seconds.toString()) : seconds.toString();
    }

    getDateFormat(dateValue: number) {
        if (dateValue.toString().length > 1) {
            return dateValue;
        }
        return '0' + dateValue;
    }

    isChromeBrowser() {
        return navigator.userAgent.indexOf('Chrome') > -1;
    }

    isIEBrowser() {
        return navigator.userAgent.indexOf('MSIE') > -1;
    }

    isFireFoxBrowser() {
        return navigator.userAgent.indexOf('Firefox') > -1;
    }

    isSafariBrowser() {
        return navigator.userAgent.indexOf('Safari') !== -1 &&
            navigator.userAgent.indexOf('Chrome') === -1;
    }

    isOperaBrowser() {
        return navigator.userAgent.toLowerCase().indexOf('op') > -1;
    }

    isPhone() {
        let isphone = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                isphone = true;
            }
        })
            (navigator.userAgent || navigator.vendor || window.opera);
        return isphone;
    }

    isPhoneOrTablet = function () {
        let isphoneortablet = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                isphoneortablet = true;
            }
        })(navigator.userAgent || navigator.vendor || window.opera);
        return isphoneortablet;
    }

    isIOS() {
        return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    }

    captialString(data) {
        if (!this.isNullOrEmpty(data)) {
            data = data.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });
        }
        return data;
    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    parseOffsetTimezone(offset) {
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

    getLocation(lat, lng, locations) {
        let exists: any = locations.find(l => {
            return l.lat === lat && l.lng === lng;
        });
        if (exists && exists.length > 0) {
            return exists[0];
        }
        return null
    }

    isStandardTime(zone) {
        switch (zone) {
            case '-10.00~Aleutian Standard Time':
            case '-9.00~Alaskan Standard Time':
            case '-8.00~Pacific Standard Time (Mexico)':
            case '-8.00~Pacific Standard Time':
            case '-7.00~Mountain Standard Time (Mexico)':
            case '-7.00~Mountain Standard Time':
            case '-6.00~Central Standard Time':
            case '-6.00~Easter Island Standard Time':
            case '-6.00~Central Standard Time (Mexico)':
            case '-5.00~Eastern Standard Time':
            case '-5.00~Haiti Standard Time':
            case '-5.00~Cuba Standard Time':
            case '-5.00~US Eastern Standard Time':
            case '-4.00~Paraguay Standard Time':
            case '-4.00~Atlantic Standard Time':
            case '-4.00~Central Brazilian Standard Time':
            case '-4.00~Pacific SA Standard Time':
            case '-3.30~Newfoundland Standard Time':
            case '-3.00~E. South America Standard Time':
            case '-3.00~Greenland Standard Time':
            case '-3.00~Saint Pierre Standard Time':
            case '-1.00~Azores Standard Time':
            case '0.00~Morocco Standard Time':
            case '0.00~GMT Standard Time':
            case '1.00~W. Europe Standard Time':
            case '1.00~Central Europe Standard Time':
            case '1.00~Romance Standard Time':
            case '1.00~Central European Standard Time':
            case '2.00~Jordan Standard Time':
            case '2.00~GTB Standard Time':
            case '2.00~Middle East Standard Time':
            case '2.00~E. Europe Standard Time':
            case '2.00~Syria Standard Time':
            case '2.00~West Bank Gaza Standard Time':
            case '2.00~FLE Standard Time':
            case '2.00~Jerusalem Standard Time':
            case '3.30~Iran Standard Time':
            case '9.30~Cen. Australia Standard Time':
            case '10.00~AUS Eastern Standard Time':
            case '10.00~Tasmania Standard Time':
            case '10.30~Lord Howe Standard Time':
            case '12.00~New Zealand Standard Time':
            case '12.00~Fiji Standard Time':
            case '12.45~Chatham Islands Standard Time':
            case '13.00~Samoa Standard Time':
                return false;
            default:
                return true;
        }
    }

    getZoneNameFromUTC0000(zone) {
        switch (zone) {
            case '0.00~Coordinated Universal Time':
                return 'UTC';
            case '0.00~Morocco Standard Time':
                return 'Africa/Casablanca';
            case '0.00~GMT Standard Time ':
                return 'Europe/London';
            case '0.00~Greenwich Standard Time':
                return 'Atlantic/Reykjavik';
            default:
                return 'UTC';
        }
    }

    getZoneNameFromUTC0100(zone) {
        switch (zone) {
            case '1.00~W. Europe Standard Time':
                return 'Europe/Berlin';
            case '1.00~Central Europe Standard Time':
                return 'Europe/Budapest';
            case '1.00~Romance Standard Time':
                return 'Europe/Paris';
            case '1.00~Central European Standard Time':
                return 'Europe/Warsaw';
            case '1.00~W. Central Africa Standard Time':
                return 'Africa/Lagos';
            case '1.00~Namibia Standard Time':
                return 'Africa/Windhoek';
            default:
                return 'Europe/Andorra';
        }
    }

    getZoneNameFromUTC0200(zone) {
        switch (zone) {
            case '2.00~Jordan Standard Time':
                return 'Asia/Amman';
            case '2.00~GTB Standard Time':
                return 'Europe/Bucharest';
            case '2.00~Middle East Standard Time':
                return 'Asia/Beirut';
            case '2.00~Egypt Standard Time':
                return 'Africa/Cairo';
            case '2.00~E. Europe Standard Time':
                return 'Europe/Chisinau';
            case '2.00~Syria Standard Time':
                return 'Asia/Damascus';
            case '2.00~West Bank Gaza Standard Time':
                return 'Asia/Hebron';
            case '2.00~South Africa Standard Time':
                return 'Africa/Johannesburg';
            case '2.00~FLE Standard Time':
                return 'Europe/Kiev';
            case '2.00~Jerusalem Standard Time':
                return 'Asia/Jerusalem';
            case '2.00~Russia TZ 1 Standard Time':
                return 'Europe/Kaliningrad';
            case '2.00~Libya Standard Time':
                return 'Africa/Tripoli';
            default:
                return 'Asia/Amman';
        }
    }

    getZoneNameFromUTC0300(zone) {
        switch (zone) {
            case '3.00~Arabic Standard Time':
                return 'Asia/Baghdad';
            case '3.00~Turkey Standard Time':
                return 'Europe/Istanbul';
            case '3.00~Arab Standard Time':
                return 'Asia/Riyadh';
            case '3.00~Belarus Standard Time':
                return 'Europe/Minsk';
            case '3.00~Russia TZ 2 Standard Time':
                return 'Europe/Moscow';
            case '3.00~E. Africa Standard Time':
                return 'Africa/Nairobi';
            default:
                return 'Europe/Istanbul';
        }
    }

    getZoneNameFromUTC0330(zone) {
        switch (zone) {
            case '3.30~Iran Standard Time':
                return 'Asia/Tehran';
            default:
                return 'Asia/Tehran';
        }
    }

    getZoneNameFromUTC0400(zone) {
        switch (zone) {
            case '4.00~Arabian Standard Time':
                return 'Asia/Dubai';
            case '4.00~Astrakhan Standard Time':
                return 'Europe/Astrakhan';
            case '4.00~Azerbaijan Standard Time':
                return 'Asia/Baku';
            case '4.00~Russia TZ 3 Standard Time':
                return 'Europe/Samara';
            case '4.00~Mauritius Standard Time':
                return 'Indian/Mauritius';
            case '4.00~Saratov Standard Time':
                return 'Europe/Saratov';
            case '4.00~Georgian Standard Time':
                return 'Asia/Tbilisi';
            case '4.00~Caucasus Standard Time':
                return 'Asia/Yerevan';
            default:
                return 'Indian/Mauritius';
        }
    }

    getZoneNameFromUTC0430(zone) {
        switch (zone) {
            case '4.30~Afghanistan Standard Time':
                return 'Asia/Kabul';
            default:
                return 'Asia/Kabul';
        }
    }

    getZoneNameFromUTC0500(zone) {
        switch (zone) {
            case '5.00~West Asia Standard Time':
                return 'Asia/Ashgabat';
            case '5.00~Russia TZ 4 Standard Time':
                return 'Asia/Yekaterinburg';
            case '5.00~Pakistan Standard Time':
                return 'Asia/Karachi';
            default:
                return 'Asia/Karachi';
        }
    }

    getZoneNameFromUTC0530(zone) {
        switch (zone) {
            case '5.30~India Standard Time':
                return 'Asia/Kolkata';
            case '5.30~Sri Lanka Standard Time':
                return 'Asia/Colombo';
            default:
                return 'Asia/Kolkata';
        }
    }

    getZoneNameFromUTC0545(zone) {
        switch (zone) {
            case '5.45~Nepal Standard Time':
                return 'Asia/Kathmandu';
            default:
                return 'Asia/Katmandu';
        }
    }

    getZoneNameFromUTC0600(zone) {
        switch (zone) {
            case '6.00~Central Asia Standard Time':
                return 'Asia/Almaty';
            case '6.00~Bangladesh Standard Time':
                return 'Asia/Dhaka';
            case '6.00~Omsk Standard Time':
                return 'Asia/Omsk';
            default:
                return 'Asia/Dhaka';
        }
    }

    getZoneNameFromUTC0630(zone) {
        switch (zone) {
            case '6.30~Myanmar Standard Time':
                return 'Asia/Yangon';
            default:
                return 'Asia/Yangon';
        }
    }

    getZoneNameFromUTC0700(zone) {
        switch (zone) {
            case '7.00~SE Asia Standard Time':
                return 'Asia/Bangkok';
            case '7.00~Altai Standard Time':
                return 'Asia/Barnaul';
            case '7.00~W. Mongolia Standard Time':
                return 'Asia/Hovd';
            case '7.00~Russia TZ 6 Standard Time':
                return 'Asia/Krasnoyarsk';
            case '7.00~Novosibirsk Standard Time':
                return 'Asia/Novosibirsk';
            case '7.00~Tomsk Standard Time':
                return 'Asia/Tomsk';
            default:
                return 'Asia/Bangkok';
        }
    }

    getZoneNameFromUTC0800(zone) {
        switch (zone) {
            case '8.00~China Standard Time':
                return 'Asia/Hong_Kong';
            case '8.00~Russia TZ 7 Standard Time':
                return 'Asia/Irkutsk';
            case '8.00~Malay Peninsula Standard Time':
                return 'Asia/Kuala_Lumpur';
            case '8.00~W. Australia Standard Time':
                return 'Australia/Perth';
            case '8.00~Taipei Standard Time':
                return 'Asia/Taipei';
            case '8.00~Ulaanbaatar Standard Time':
                return 'Asia/Ulaanbaatar';
            default:
                return 'Asia/Hong_Kong';
        }
    }

    getZoneNameFromUTC0830(zone) {
        switch (zone) {
            case '8.30~North Korea Standard Time':
                return 'Asia/Pyongyang';
            default:
                return 'Asia/Pyongyang';
        }
    }

    getZoneNameFromUTC0845(zone) {
        switch (zone) {
            case '8.45~Aus Central W. Standard Time':
                return 'Australia/Eucla';
            default:
                return 'Australia/Eucla';
        }
    }

    getZoneNameFromUTC0900(zone) {
        switch (zone) {
            case '9.00~Transbaikal Standard Time':
                return 'Asia/Chita';
            case '9.00~Tokyo Standard Time ':
                return 'Asia/Tokyo';
            case '9.00~Korea Standard Time':
                return 'Asia/Seoul';
            case '9.00~Russia TZ 8 Standard Time':
                return 'Asia/Yakutsk';
            default:
                return 'Asia/Tokyo';
        }
    }

    getZoneNameFromUTC0930(zone) {
        switch (zone) {
            case '9.30~Cen. Australia Standard Time':
                return 'Australia/Adelaide';
            case '9.30~AUS Central Standard Time':
                return 'Australia/Darwin';
            default:
                return 'Australia/Adelaide';
        }
    }

    getZoneNameFromUTC1000(zone) {
        switch (zone) {
            case '10.00~E. Australia Standard Time':
                return 'Australia/Brisbane';
            case '10.00~AUS Eastern Standard Time':
                return 'Australia/Sydney';
            case '10.00~West Pacific Standard Time':
                return 'Pacific/Port_Moresby';
            case '10.00~Tasmania Standard Time':
                return 'Australia/Hobart';
            case '10.00~Russia TZ 9 Standard Time':
                return 'Asia/Vladivostok';
            default:
                return 'Australia/Sydney';
        }
    }

    getZoneNameFromUTC1030(zone) {
        switch (zone) {
            case '10.30~Lord Howe Standard Time':
                return 'Australia/Lord_Howe';
            default:
                return 'Australia/Lord_Howe';
        }
    }

    getZoneNameFromUTC1100(zone) {
        switch (zone) {
            case '11.00~Bougainville Standard Time':
                return 'Pacific/Bougainville';
            case '11.00~Russia TZ 10 Standard Time':
                return 'Asia/Srednekolymsk';
            case '11.00~Magadan Standard Time':
                return 'Asia/Magadan';
            case '11.00~Norfolk Standard Time':
                return 'Pacific/Norfolk';
            case '11.00~Sakhalin Standard Time':
                return 'Asia/Sakhalin';
            case '11.00~Central Pacific Standard Time':
                return 'Pacific/Guadalcanal';
            default:
                return 'Pacific/Bougainville';
        }
    }

    getZoneNameFromUTC1200(zone) {
        switch (zone) {
            case '12.00~Russia TZ 11 Standard Time':
                return 'Asia/Anadyr';
            case '12.00~New Zealand Standard Time':
                return 'Pacific/Auckland';
            case '12.00~UTC+12':
                return 'Etc/GMT-12';
            case '12.00~Fiji Standard Time':
                return 'Pacific/Fiji';
            case '12.00~Kamchatka Standard Time':
                return 'Asia/Kamchatka';
            default:
                return 'Pacific/Fiji';
        }
    }

    getZoneNameFromUTC1245(zone) {
        switch (zone) {
            case '12.45~Chatham Islands Standard Time':
                return 'Pacific/Chatham';
            default:
                return 'Pacific/Chatham';
        }
    }

    getZoneNameFromUTC1300(zone) {
        switch (zone) {
            case '13.00~UTC+13':
                return 'Etc/GMT-13';
            case '13.00~Tonga Standard Time':
                return 'Pacific/Tongatapu';
            case '13.00~Samoa Standard Time':
                return 'Pacific/Apia';
            default:
                return 'Pacific/Apia';
        }
    }

    getZoneNameFromUTC1400(zone) {
        switch (zone) {
            case '14.00~Line Islands Standard Time':
                return 'Pacific/Kiritimati';
            default:
                return 'Pacific/Kiritimati';
        }
    }

    getZoneNameFromUTC_0100(zone) {
        switch (zone) {
            case '-1.00~Azores Standard Time':
                return 'Atlantic/Azores';
            case '-1.00~Cabo Verde Standard Time ':
                return 'Atlantic/Cape_Verde';
            default:
                return 'Atlantic/Azores';
        }
    }

    getZoneNameFromUTC_0200(zone) {
        switch (zone) {
            case '-2.00~Mid-Atlantic Standard Time':
                return 'Atlantic/Noronha';
            case '-2.00~UTC-02':
                return 'Etc/GMT+2';
            default:
                return 'Etc/GMT+2';
        }
    }

    getZoneNameFromUTC_0300(zone) {
        switch (zone) {
            case '-3.00~Bahia Standard Time':
                return 'America/Bahia';
            case '-3.00~Saint Pierre Standard Time':
                return 'America/Miquelon';
            case '-3.00~Magallanes Standard Time':
                return 'America/Punta_Arenas';
            case '-3.00~Montevideo Standard Time':
                return 'America/Montevideo';
            case '-3.00~Greenland Standard Time':
                return 'America/Godthab';
            case '-3.00~Argentina Standard Time':
                return 'America/Argentina/Buenos_Aires';
            case '-3.00~SA Eastern Standard Time':
                return 'America/Cayenne';
            case '-3.00~E. South America Standard Time':
                return 'America/Sao_Paulo';
            case '-3.00~Tocantins Standard Time':
                return 'America/Araguaina';
            default:
                return 'America/Sao_Paulo';
        }
    }

    getZoneNameFromUTC_0330(zone) {
        switch (zone) {
            case '-3.30~Newfoundland Standard Time':
                return 'America/St_Johns';
            default:
                return 'America/St_Johns';
        }
    }

    getZoneNameFromUTC_0400(zone) {
        switch (zone) {
            case '-4.00~Paraguay Standard Time':
                return 'America/Asuncion';
            case '-4.00~Atlantic Standard Time':
                return 'America/Halifax';
            case '-4.00~Venezuela Standard Time':
                return 'America/Caracas';
            case '-4.00~Central Brazilian Standard Time':
                return 'America/Cuiaba';
            case '-4.00~SA Western Standard Time':
                return 'America/La_Paz';
            case '-4.00~Pacific SA Standard Time':
                return 'America/Santiago';
            case '-4.00~Turks and Caicos Standard Time':
                return 'America/Grand_Turk';
            default:
                return 'America/Santiago';
        }
    }

    getZoneNameFromUTC_0500(zone) {
        switch (zone) {
            case '-5.00~SA Pacific Standard Time':
                return 'America/Bogota';
            case '-5.00~Eastern Standard Time (Mexico)':
                return 'America/Cancun';
            case '-5.00~Eastern Standard Time':
                return 'America/New_York';
            case '-5.00~Haiti Standard Time':
                return 'America/Port-au-Prince';
            case '-5.00~Cuba Standard Time':
                return 'America/Havana';
            case '-5.00~US Eastern Standard Time':
                return 'America/Indiana/Indianapolis';
            default:
                return 'America/Bogota';
        }
    }

    getZoneNameFromUTC_0600(zone) {
        switch (zone) {
            case '-6.00~Central America Standard Time':
                return 'America/Guatemala';
            case '-6.00~Central Standard Time':
                return 'America/Chicago';
            case '-6.00~Easter Island Standard Time':
                return 'Pacific/Easter';
            case '-6.00~Central Standard Time (Mexico)':
                return 'America/Mexico_City';
            case '-6.00~Canada Central Standard Time':
                return 'America/Regina';
            default:
                return 'America/Chicago';
        }
    }

    getZoneNameFromUTC_0700(zone) {
        switch (zone) {
            case '-7.00~US Mountain Standard Time':
                return 'America/Phoenix';
            case '-7.00~Mountain Standard Time (Mexico)':
                return 'America/Chihuahua';
            case '-7.00~Mountain Standard Time':
                return 'America/Denver';
            default:
                return 'America/Denver';
        }
    }

    getZoneNameFromUTC_0800(zone) {
        switch (zone) {
            case '-8.00~Pacific Standard Time (Mexico)':
                return 'America/Tijuana';
            case '-8.00~UTC-08':
                return 'Etc/GMT+8';
            case '-8.00~Pacific Standard Time':
                return 'America/Los_Angeles';
            default:
                return 'America/Tijuana';
        }
    }

    getZoneNameFromUTC_0900(zone) {
        switch (zone) {
            case '-9.00~Alaskan Standard Time':
                return 'America/Anchorage';
            case '-9.00~UTC-09':
                return 'Etc/GMT+9';
            default:
                return 'America/Anchorage';
        }
    }

    getZoneNameFromUTC_0930(zone) {
        switch (zone) {
            case '-9.30~Marquesas Standard Time':
                return 'Pacific/Marquesas';
            default:
                return 'Pacific/Marquesas';
        }
    }

    getZoneNameFromUTC_1000(zone) {
        switch (zone) {
            case '-10.00~Hawaiian Standard Time':
                return 'Pacific/Honolulu';
            case '-10.00~Aleutian Standard Time':
                return 'America/Adak';
            default:
                return 'Pacific/Honolulu';
        }
    }

    getZoneNameFromUTC_1100(zone) {
        switch (zone) {
            case '-11.00~UTC-11':
                return 'Etc/GMT+11';
            default:
                return 'Etc/GMT+11';
        }
    }

    getZoneNameFromUTC_1200(zone) {
        switch (zone) {
            case '-12.00~Dateline Standard Time':
                return 'Etc/GMT+12';
            default:
                return 'Etc/GMT+12';
        }
    }

    getZoneNameFromUTC(offset, zone) {
        switch (offset) {
            case '0.00':
                return this.getZoneNameFromUTC0000(zone);
            case '1.00':
                return this.getZoneNameFromUTC0100(zone);
            case '2.00':
                return this.getZoneNameFromUTC0200(zone);
            case '3.00':
                return this.getZoneNameFromUTC0300(zone);
            case '3.30':
                return this.getZoneNameFromUTC0330(zone);
            case '4.00':
                return this.getZoneNameFromUTC0400(zone);
            case '4.30':
                return this.getZoneNameFromUTC0430(zone);
            case '5.00':
                return this.getZoneNameFromUTC0500(zone);
            case '5.30':
                return this.getZoneNameFromUTC0530(zone);
            case '5.45':
                return this.getZoneNameFromUTC0545(zone);
            case '6.00':
                return this.getZoneNameFromUTC0600(zone);
            case '6.30':
                return this.getZoneNameFromUTC0630(zone);
            case '7.00':
                return this.getZoneNameFromUTC0700(zone);
            case '8.00':
                return this.getZoneNameFromUTC0800(zone);
            case '8.30':
                return this.getZoneNameFromUTC0830(zone);
            case '8.45':
                return this.getZoneNameFromUTC0845(zone);
            case '9.00':
                return this.getZoneNameFromUTC0900(zone);
            case '9.30':
                return this.getZoneNameFromUTC0930(zone);
            case '10.00':
                return this.getZoneNameFromUTC1000(zone);
            case '10.30':
                return this.getZoneNameFromUTC1030(zone);
            case '11.00':
                return this.getZoneNameFromUTC1100(zone);
            case '12.00':
                return this.getZoneNameFromUTC1200(zone);
            case '12.45':
                return this.getZoneNameFromUTC1245(zone);
            case '13.00':
                return this.getZoneNameFromUTC1300(zone);
            case '14.00':
                return this.getZoneNameFromUTC1400(zone);
            case '-1.00':
                return this.getZoneNameFromUTC_0100(zone);
            case '-2.00':
                return this.getZoneNameFromUTC_0200(zone);
            case '-3.00':
                return this.getZoneNameFromUTC_0300(zone);
            case '-3.30':
                return this.getZoneNameFromUTC_0330(zone);
            case '-4.00':
                return this.getZoneNameFromUTC_0400(zone);
            case '-5.00':
                return this.getZoneNameFromUTC_0500(zone);
            case '-6.00':
                return this.getZoneNameFromUTC_0600(zone);
            case '-7.00':
                return this.getZoneNameFromUTC_0700(zone);
            case '-8.00':
                return this.getZoneNameFromUTC_0800(zone);
            case '-9.00':
                return this.getZoneNameFromUTC_0900(zone);
            case '-9.30':
                return this.getZoneNameFromUTC_0930(zone);
            case '-10.00':
                return this.getZoneNameFromUTC_1000(zone);
            case '-11.00':
                return this.getZoneNameFromUTC_1100(zone);
            case '-12.00':
                return this.getZoneNameFromUTC_1200(zone);
            default:
                return 'America/Chicago';
        }
    }

    getUTCFromZoneName(zoneName) {
        switch (zoneName) {
            case 'UTC':
                return '0.00~Coordinated Universal Time';
            case 'Africa/Monrovia':
            case 'Atlantic/Reykjavik':
            case 'Atlantic/St_Helena':
                return '0.00~Greenwich Standard Time';
            case 'Europe/Dublin':
            case 'Europe/Lisbon':
            case 'Europe/London':
                return '0.00~GMT Standard Time';
            case 'Africa/Casablanca':
                return '0.00~Morocco Standard Time';
            case 'Europe/Amsterdam':
            case 'Europe/Berlin':
            case 'Europe/Rome':
            case 'Europe/Stockholm':
            case 'Europe/Vienna':
            case 'Africa/Porto-Novo':
                return '1.00~W. Europe Standard Time';
            case 'Europe/Belgrade':
            case 'Europe/Budapest':
            case 'Europe/Prague':
            case 'Europe/Ljubljana':
            case 'Europe/Bratislava':
                return '1.00~Central Europe Standard Time';
            case 'Europe/Brussels':
            case 'Europe/Paris':
            case 'Europe/Madrid':
            case 'Europe/Copenhagen':
                return '1.00~Romance Standard Time';
            case 'Europe/Sarajevo':
            case 'Europe/Warsaw':
            case 'Europe/Zagreb':
            case 'Europe/Skopje':
                return '1.00~Central European Standard Time';
            case 'Africa/Lagos':
                return '1.00~W. Central Africa Standard Time';
            case 'Africa/Windhoek':
                return '1.00~Namibia Standard Time';
            case 'Asia/Amman':
                return '2.00~Jordan Standard Time';
            case 'Europe/Bucharest':
            case 'Europe/Athens':
                return '2.00~GTB Standard Time';
            case 'Asia/Beirut':
                return '2.00~Middle East Standard Time';
            case 'Africa/Cairo':
                return '2.00~Egypt Standard Time';
            case 'Europe/Chisinau':
                return '2.00~E. Europe Standard Time';
            case 'Asia/Damascus':
                return '2.00~Syria Standard Time';
            case 'Asia/Gaza':
            case 'Asia/Hebron':
                return '2.00~West Bank Gaza Standard Time';
            case 'Africa/Johannesburg':
            case 'Africa/Gaborone':
            case 'Africa/Harare':
            case 'Africa/Lusaka':
            case 'Africa/Lubumbashi':
            case 'Africa/Kigali':
            case 'Africa/Khartoum':
                return '2.00~South Africa Standard Time';
            case 'Europe/Helsinki':
            case 'Europe/Kyiv':
            case 'Europe/Kiev':
            case 'Europe/Riga':
            case 'Europe/Sofia':
            case 'Europe/Tallinn':
            case 'Europe/Vilnius':
                return '2.00~FLE Standard Time';
            case 'Asia/Jerusalem':
                return '2.00~Jerusalem Standard Time';
            case 'Europe/Kaliningrad':
                return '2.00~Russia TZ 1 Standard Time';
            case 'Africa/Tripoli':
                return '2.00~Libya Standard Time';
            case 'Asia/Baghdad':
                return '3.00~Arabic Standard Time';
            case 'Europe/Istanbul':
                return '3.00~Turkey Standard Time';
            case 'Asia/Kuwait':
            case 'Asia/Riyadh':
            case 'Asia/Aden':
                return '3.00~Arab Standard Time';
            case 'Europe/Minsk':
                return '3.00~Belarus Standard Time';
            case 'Europe/Moscow':
            case 'Europe/Volgograd':
                return '3.00~Russia TZ 2 Standard Time';
            case 'Africa/Nairobi':
            case 'Africa/Addis_Ababa':
            case 'Africa/Asmera':
                return '3.00~E. Africa Standard Time';
            case 'Asia/Tehran':
                return '3.30~Iran Standard Time';
            case 'Asia/Dubai':
                return '4.00~Arabian Standard Time';
            case 'Europe/Astrakhan':
            case 'Europe/Ulyanovsk':
                return '4.00~Astrakhan Standard Time';
            case 'Asia/Baku':
                return '4.00~Azerbaijan Standard Time';
            case 'Europe/Samara':
                return '4.00~Russia TZ 3 Standard Time';
            case 'Indian/Mauritius':
                return '4.00~Mauritius Standard Time';
            case 'Europe/Saratov':
                return '4.00~Saratov Standard Time';
            case 'Asia/Tbilisi':
                return '4.00~Georgian Standard Time';
            case 'Asia/Yerevan':
                return '4.00~Caucasus Standard Time';
            case 'Asia/Kabul':
                return '4.30~Afghanistan Standard Time';
            case 'Asia/Ashgabat':
            case 'Asia/Tashkent':
                return '5.00~West Asia Standard Time';
            case 'Asia/Yekaterinburg':
                return '5.00~Russia TZ 4 Standard Time';
            case 'Asia/Karachi':
                return '5.00~Pakistan Standard Time';
            case 'Asia/Kolkata':
                return '5.30~India Standard Time';
            case 'Asia/Colombo':
                return '5.30~Sri Lanka Standard Time';
            case 'Asia/Kathmandu':
                return '5.45~Nepal Standard Time';
            case 'Asia/Almaty':
                return '6.00~Central Asia Standard Time';
            case 'Asia/Dhaka':
                return '6.00~Bangladesh Standard Time';
            case 'Asia/Omsk':
                return '6.00~Omsk Standard Time';
            case 'Asia/Yangon':
                return '6.30~Myanmar Standard Time';
            case 'Asia/Bangkok':
            case 'Asia/Hanoi':
            case 'Asia/Saigon':
            case 'Asia/Jakarta':
                return '7.00~SE Asia Standard Time';
            case 'Asia/Barnaul':
                return '7.00~Altai Standard Time';
            case 'Asia/Hovd':
                return '7.00~W. Mongolia Standard Time';
            case 'Asia/Krasnoyarsk':
                return '7.00~Russia TZ 6 Standard Time';
            case 'Asia/Novosibirsk':
                return '7.00~Novosibirsk Standard Time';
            case 'Asia/Tomsk':
                return '7.00~Tomsk Standard Time';
            case 'Asia/Hong_Kong':
            case 'Asia/Shanghai':
                return '8.00~China Standard Time';
            case 'Asia/Irkutsk':
                return '8.00~Russia TZ 7 Standard Time';
            case 'Asia/Singapore':
            case 'Asia/Kuala_Lumpur':
            case 'Asia/Makassar':
            case 'Asia/Manila':
                return '8.00~Malay Peninsula Standard Time';
            case 'Australia/Perth':
                return '8.00~W. Australia Standard Time';
            case 'Asia/Taipei':
                return '8.00~Taipei Standard Time';
            case 'Asia/Ulaanbaatar':
                return '8.00~Ulaanbaatar Standard Time';
            case 'Asia/Pyongyang':
                return '8.30~North Korea Standard Time';
            case 'Australia/Eucla':
                return '8.45~Aus Central W. Standard Time';
            case 'Asia/Chita':
            case 'Asia/Jayapura':
            case 'Asia/Dili':
                return '9.00~Transbaikal Standard Time';
            case 'Asia/Tokyo':
                return '9.00~Tokyo Standard Time';
            case 'Asia/Seoul':
                return '9.00~Korea Standard Time';
            case 'Asia/Yakutsk':
                return '9.00~Russia TZ 8 Standard Time';
            case 'Australia/Adelaide':
                return '9.30~Cen. Australia Standard Time';
            case 'Australia/Darwin':
                return '9.30~AUS Central Standard Time';
            case 'Australia/Brisbane':
                return '10.00~E. Australia Standard Time';
            case 'Australia/Sydney':
            case 'Australia/Melbourne':
                return '10.00~AUS Eastern Standard Time';
            case 'Pacific/Port_Moresby':
            case 'Pacific/Saipan':
            case 'Pacific/Guam':
                return '10.00~West Pacific Standard Time';
            case 'Australia/Hobart':
                return '10.00~Tasmania Standard Time';
            case 'Asia/Vladivostok':
                return '10.00~Russia TZ 9 Standard Time';
            case 'Australia/Lord_Howe':
                return '10.30~Lord Howe Standard Time';
            case 'Pacific/Bougainville':
                return '11.00~Bougainville Standard Time';
            case 'Asia/Srednekolymsk':
                return '11.00~Russia TZ 10 Standard Time';
            case 'Asia/Magadan':
                return '11.00~Magadan Standard Time';
            case 'Pacific/Norfolk':
                return '11.00~Norfolk Standard Time';
            case 'Asia/Sakhalin':
                return '11.00~Sakhalin Standard Time';
            case 'Pacific/Guadalcanal':
            case 'Pacific/Noumea':
            case 'Pacific/Efate':
                return '11.00~Central Pacific Standard Time';
            case 'Asia/Anadyr':
                return '12.00~Russia TZ 11 Standard Time';
            case 'Pacific/Auckland':
                return '12.00~New Zealand Standard Time';
            case 'Etc/GMT-12':
            case 'Pacific/Wallis':
                return '12.00~UTC+12';
            case 'Pacific/Fiji':
                return '12.00~Fiji Standard Time';
            case 'Asia/Kamchatka':
                return '12.00~Kamchatka Standard Time';
            case 'Pacific/Chatham':
                return '12.45~Chatham Islands Standard Time';
            case 'Etc/GMT-13':
                return '13.00~UTC+13';
            case 'Pacific/Tongatapu':
                return '13.00~Tonga Standard Time';
            case 'Pacific/Apia':
                return '13.00~Samoa Standard Time';
            case 'Pacific/Kiritimati':
                return '14.00~Line Islands Standard Time';
            case 'Atlantic/Azores':
                return '-1.00~Azores Standard Time';
            case 'Atlantic/Cape_Verde':
                return '-1.00~Cabo Verde Standard Time';
            case 'Etc/GMT+2':
                return '-2.00~UTC-02';
            case 'America/Noronha':
            case 'Atlantic/South_Georgia':
                return '-2.00~Mid-Atlantic Standard Time';
            case 'America/Araguaina':
                return '-3.00~Tocantins Standard Time';
            case 'America/Sao_Paulo':
                return '-3.00~E. South America Standard Time';
            case 'America/Cayenne':
            case 'America/Fortaleza':
            case 'America/Recife':
                return '-3.00~SA Eastern Standard Time';
            case 'America/Argentina/Buenos_Aires':
            case 'America/Argentina/Rio_Gallegos':
            case 'America/Argentina/La_Rioja':
            case 'America/Argentina/Salta':
            case 'America/Mendoza':
            case 'America/Cordoba':
            case 'America/Buenos_Aires':
            case 'America/Catamarca':
            case 'America/Argentina/San_Luis':
            case 'America/Argentina/San_Juan':
            case 'America/Argentina/Tucuman':
                return '-3.00~Argentina Standard Time';
            case 'America/Godthab':
                return '-3.00~Greenland Standard Time';
            case 'America/Montevideo':
                return '-3.00~Montevideo Standard Time';
            case 'America/Punta_Arenas':
                return '-3.00~Magallanes Standard Time';
            case 'America/Miquelon':
                return '-3.00~Saint Pierre Standard Time';
            case 'America/Bahia':
                return '-3.00~Bahia Standard Time';
            case 'America/St_Johns':
                return '-3.30~Newfoundland Standard Time';
            case 'America/Asuncion':
                return '-4.00~Paraguay Standard Time';
            case 'America/Halifax':
            case 'America/Puerto_Rico':
            case 'America/Santo_Domingo':
            case 'Atlantic/Bermuda':
            case 'America/Montreal':
                return '-4.00~Atlantic Standard Time';
            case 'America/Caracas':
                return '-4.00~Venezuela Standard Time';
            case 'America/Cuiaba':
                return '-4.00~Central Brazilian Standard Time';
            case 'America/Manaus':
            case 'America/La_Paz':
                return '-4.00~SA Western Standard Time';
            case 'America/Santiago':
                return '-4.00~Pacific SA Standard Time';
            case 'America/Grand_Turk':
                return '-4.00~Turks and Caicos Standard Time';
            case 'America/Bogota':
            case 'America/Lima':
            case 'America/Rio_Branco':
                return '-5.00~SA Pacific Standard Time';
            case 'America/Cancun':
                return '-5.00~Eastern Standard Time (Mexico)';
            case 'US/Eastern':
            case 'America/New_York':
            case 'America/Detroit':
            case 'America/Toronto':
            case 'America/Guayaquil':
                return '-5.00~Eastern Standard Time';
            case 'America/Port-au-Prince':
                return '-5.00~Haiti Standard Time';
            case 'America/Havana':
                return '-5.00~Cuba Standard Time';
            case 'US/East-Indiana':
            case 'America/Indiana/Indianapolis':
            case 'America/Indianapolis':
                return '-5.00~US Eastern Standard Time';
            case 'America/Guatemala':
                return '-6.00~Central America Standard Time';
            case 'America/Chicago':
            case 'US/Central':
            case 'America/Managua':
            case 'America/Matamoros':
            case 'America/El_Salvador':
            case 'America/Merida':
                return '-6.00~Central Standard Time';
            case 'Pacific/Easter':
                return '-6.00~Easter Island Standard Time';
            case 'America/Mexico_City':
            case 'America/Monterrey':
                return '-6.00~Central Standard Time (Mexico)';
            case 'America/Regina':
                return '-6.00~Canada Central Standard Time';
            case 'US/Arizona':
                return '-7.00~US Mountain Standard Time';
            case 'America/Chihuahua':
                return '-7.00~Mountain Standard Time (Mexico)';
            case 'US/Mountain':
            case 'America/Phoenix':
            case 'America/Denver':
            case 'America/Boise':
            case 'America/Hermosillo':
            case 'America/Dawson_Creek':
                return '-7.00~Mountain Standard Time';
            case 'America/Tijuana':
                return '-8.00~Pacific Standard Time (Mexico)';
            case 'Etc/GMT+8':
            case 'Pacific/Pitcairn':
                return '-8.00~UTC-08';
            case 'America/Los_Angeles':
            case 'America/Vancouver':
                return '-8.00~Pacific Standard Time';
            case 'America/Anchorage':
            case 'America/Nome':
            case 'America/Juneau':
            case 'America/Sitka':
                return '-9.00~Alaskan Standard Time';
            case 'Etc/GMT+9':
                return '-9.00~UTC-09';
            case 'Pacific/Marquesas':
                return '-9.30~Marquesas Standard Time';
            case 'America/Adak':
                return '-10.00~Aleutian Standard Time';
            case 'Pacific/Honolulu':
                return '-10.00~Hawaiian Standard Time';
            case 'Etc/GMT+11':
            case 'Pacific/Midway':
            case 'Pacific/Pago_Pago':
            case 'Pacific/Niue':
                return '-11.00~UTC-11';
            case 'Etc/GMT+12':
                return '-12.00~Dateline Standard Time';
            default: return '';
        }
    }

    urlBase64Decode(str: string): string {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw 'Illegal base64url string!';
            }
        }
        return this.b64DecodeUnicode(output);
    }

    // credits for decoder goes to https://github.com/atk
    b64decode(str: string): string {
        let chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output: string = '';

        str = String(str).replace(/=+$/, '');

        if (str.length % 4 === 1) {
            throw new Error(
                "'atob' failed: The string to be decoded is not correctly encoded."
            );
        }

        for (
            // initialize result and counters
            let bc: number = 0, bs: any, buffer: any, idx: number = 0;
            // get next character
            (buffer = str.charAt(idx++));
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer &&
                (
                    (bs = bc % 4 ? bs * 64 + buffer : buffer),
                    // and if not first of each 4 characters,
                    // convert the first 8 bits to one ascii character
                    bc++ % 4
                )
                ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
                : 0
        ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    }

    b64DecodeUnicode(str: any) {
        return decodeURIComponent(
            Array.prototype.map
                .call(this.b64decode(str), (c: any) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
    }

    decodeToken(token: string): any {
        if (!token) {
            token = localStorage.getItem(GlobalSettings.Info.access_token);
        }

        let parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('The inspected token doesn\'t appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.');
        }

        let decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token.');
        }

        return JSON.parse(decoded);
    }

    getTokenExpirationDate(token: string): Date {
        if (!token) {
            token = localStorage.getItem(GlobalSettings.Info.access_token);
        }

        let decoded: any;
        decoded = this.decodeToken(token);

        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    isTokenExpired(token: string, offsetSeconds?: number): boolean {
        if (!token) {
            token = localStorage.getItem(GlobalSettings.Info.access_token);
        }

        let date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;

        if (date === null) {
            return false;
        }

        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }

    resetUserToken() {
        localStorage.removeItem(GlobalSettings.Info.access_token);
        localStorage.removeItem(GlobalSettings.Info.refresh_token);
        localStorage.removeItem(GlobalSettings.Info.last_login);
        localStorage.removeItem(GlobalSettings.Info.code_token);
        localStorage.removeItem(GlobalSettings.Info.state_token);
    }
}
