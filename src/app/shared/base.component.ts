import { OnInit, Inject, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, asapScheduler, Subject } from 'rxjs';
//For dialog
import { DOCUMENT } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//Global
import 'moment';
import * as moment_ from 'moment-timezone';
const moment = moment_;
declare let window: any;
declare let jQuery: any;
import { SharedPropertyService } from './services/shared-property.service';
import { Platform } from '@angular/cdk/platform';
import { environment } from '../../environments/environment';
import { GlobalSettings } from './global.settings';
import { takeUntil } from 'rxjs/operators';
import { CommonUtility } from './common.utility';

@Component({
    template: ''
})

export class BaseComponent implements OnInit {
    private _id: number = 0;
    get ID() {
        return this._id;
    }
    set ID(id: number) {
        this._id = id;
    }

    private _loading: boolean = false;
    get showLoading() {
        return this._loading;
    }
    set showLoading(loading: boolean) {
        this._loading = loading;
    }

    private _isSystemAdmin: boolean = false;
    get isSystemAdmin() {
        return this._isSystemAdmin;
    }
    set isSystemAdmin(isSystemAdmin: boolean) {
        this._isSystemAdmin = isSystemAdmin;
    }

    private _globalSearch = [];
    get globalSearch() {
        return this._globalSearch;
    }

    set globalSearch(_globalSearch: any) {
        this._globalSearch = _globalSearch;
    }

    public envName: string = '';
    public selectedTab: number;
    public isOpenMenu: boolean = false;
    public actionsMenu: boolean = false;
    public isSearch: boolean = false;
    public iOS = {
        iPhone: {
            Safari: false,
            Chrome: false
        },
        iPad: {
            Safari: false,
            Chrome: false
        }
    };

    public offset: any;
    public isDST: any;
    public autoSync: any;
    public selection: any;
    public basePermissions: any;
    public permissions: any;
    public subscription: any = {};
    public unsubscribe: Subject<void> = new Subject();

    constructor(public router: Router,
        public sharedService: SharedPropertyService,
        public dialog: MatDialog,
        @Inject(DOCUMENT) doc: any,
        public platform: Platform) {
        this.resetPermissions();
        this.getGlobalConfig();
        this.envName = environment.envName;
        // dialog.afterOpen.subscribe((ref: MatDialogRef<any>) => {
        //     if (!doc.body.classList.contains('no-scroll')) {
        //         doc.body.classList.add('no-scroll');
        //         doc.body.style.overFlow = 'hidden;'
        //     }
        // });
        // dialog.afterAllClosed.subscribe(() => {
        //     doc.body.classList.remove('no-scroll');
        //     doc.body.style.overFlow = 'auto'
        // });
        this.iOS.iPhone.Safari = this.iPhoneSafari();
        this.setTimezone();
        this.sharedService.sharedData({ action: 'check-for-update' });
    }

    ngOnInit() {
    }

    setTimezone() {
        if (!this.isNullOrEmpty(this.sharedService.GlobalConfig)) {
            let offset = this.sharedService.GlobalConfig['offset'];
            let zone = this.sharedService.GlobalConfig['zone'];
            let currentZone = '';
            if (this.autoSync) {
                let now = new Date();
                let currentOffset = 0 - now.getTimezoneOffset();
                currentOffset = currentOffset / 60;
                this.offset = this.sharedService.GlobalConfig['offset'] = currentOffset;
                currentZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                this.sharedService.CurrentTimezone = currentOffset * 60;
                let utcName = this.sharedService.getUTCFromZoneName(currentZone);
                let timezone = currentOffset * 60;
                if (!this.isNullOrEmpty(utcName)) {
                    let utcValue: any = utcName.split('~')[0];
                    utcValue = this.sharedService.parseOffsetTimezone(utcValue);
                    timezone = utcValue * 60;
                }
                if (!this.isNullOrEmpty(timezone)) {
                    if (timezone % 60 === 0) {
                        this.sharedService.CurrentUTCTimezone = (timezone > 0 ? '+' : '') + (timezone / 60) + '.00';
                    }
                    else {
                        let curZone = timezone < 0 ? timezone * (-1) : timezone;
                        this.sharedService.CurrentUTCTimezone = (timezone > 0 ? '+' : '') + Math.floor(timezone / 60) + '.' + (curZone % 60);
                    }
                }
            }
            else {
                if (zone && !zone.includes('~')) {
                    let offset = this.sharedService.GlobalConfig['offset'];
                    let currentOffset: number = this.sharedService.parseOffsetTimezone(offset);
                    offset = currentOffset.toFixed(2);
                    zone = offset + '~' + zone;
                }
                currentZone = this.sharedService.getZoneNameFromUTC(offset, zone);
            }
            moment.tz.setDefault(currentZone);
        }
    }

    getGlobalConfig() {
        if (this.isNullOrEmpty(this.sharedService.GlobalConfig)) {
            this.sharedService.GlobalConfig = this.sharedService.getGlobalConfig();
            this.sharedService.GlobalConfig.isSystemAdmin = (this.sharedService.GlobalConfig.isSystemAdmin === 'True' || this.sharedService.GlobalConfig.isSystemAdmin === 'true') ? true : false;
            this.sharedService.CurrentTimezone = this.sharedService.parseOffsetTimezone(this.sharedService.GlobalConfig['offset']) * 60;
            if (!this.isNullOrEmpty(this.sharedService.CurrentTimezone)) {
                if (this.sharedService.CurrentTimezone % 60 === 0) {
                    this.sharedService.CurrentUTCTimezone = (this.sharedService.CurrentTimezone > 0 ? '+' : '') + (this.sharedService.CurrentTimezone / 60) + '.00';
                }
                else {
                    let curZone = this.sharedService.CurrentTimezone < 0 ? this.sharedService.CurrentTimezone * (-1) : this.sharedService.CurrentTimezone;
                    this.sharedService.CurrentUTCTimezone = (this.sharedService.CurrentTimezone > 0 ? '+' : '') + Math.floor(this.sharedService.CurrentTimezone / 60) + '.' + (curZone % 60);
                }
            }
        }
        this.offset = this.sharedService.GlobalConfig['offset'];
        this.isDST = this.sharedService.GlobalConfig['allowAdjust'] === '1' ? true : false;
        this.autoSync = this.sharedService.GlobalConfig['autoSync'] === '1' ? true : false;
        this.isSystemAdmin = this.sharedService.GlobalConfig.isSystemAdmin;
    }

    resetPermissions() {
        this.isSystemAdmin = false;
    }

    getGridSetting(gridName: any) {
        const key = 'girdSetting_' + this.sharedService.GlobalConfig['nameid'];
        let strGirdSetting: any = localStorage.getItem(key);
        let girdSetting: any = null;
        if (!this.isNullOrEmpty(strGirdSetting)) {
            girdSetting = JSON.parse(strGirdSetting);
            if (!this.isNullOrEmpty(girdSetting[gridName])) {
                let setting = girdSetting[gridName];
                if (this.isNullOrEmpty(setting['search'])) {
                    setting.search = {
                        quick: '',
                        advandce: {}
                    };
                    girdSetting[gridName] = setting;
                    localStorage.setItem(key, JSON.stringify(girdSetting));
                }
                return setting;
            }
            else {
                girdSetting[gridName] = {};
                const settings = {
                    skip: 0,
                    search: {
                        quick: '',
                        advandce: {}
                    },
                    sort: {
                    }
                };
                girdSetting[gridName] = settings;
                localStorage.setItem(key, JSON.stringify(girdSetting));
            }
        }
        else {
            girdSetting = {};
            girdSetting[gridName] = {
                skip: 0,
                search: {
                    quick: '',
                    advandce: {}
                },
                sort: {
                }
            };
            localStorage.setItem(key, JSON.stringify(girdSetting));
        }
        return girdSetting[gridName];
    }

    setGridSetting(gridName: any, setting: any) {
        const key = 'girdSetting_' + this.sharedService.GlobalConfig['nameid'];
        let strGirdSetting: any = localStorage.getItem(key);
        let girdSetting: any = null;
        if (!this.isNullOrEmpty(strGirdSetting)) {
            girdSetting = JSON.parse(strGirdSetting);
        } else {
            girdSetting = {};
        }
        girdSetting[gridName] = setting;
        localStorage.setItem(key, JSON.stringify(girdSetting));
    }

    getBookMarkSettingUser() {
        const key = 'searchSetting_' + this.sharedService.GlobalConfig['nameid'];
        let strSearchSetting: any = localStorage.getItem(key);
        let arrBookmarks = [];
        if (!this.isNullOrEmpty(strSearchSetting)) {
            arrBookmarks = JSON.parse(strSearchSetting);
        }
        return arrBookmarks;
    }

    setSearchSetting(ojbSearch: any, arrBookmarks: any) {
        const key = 'searchSetting_' + this.sharedService.GlobalConfig['nameid'];
        let isContain = false;
        if (arrBookmarks.length > 0) {
            for (let item of arrBookmarks) {
                if (item.id === ojbSearch.id) {
                    isContain = true;
                }
            }
        }
        if (arrBookmarks.length === 5) {
            arrBookmarks.pop();
            arrBookmarks.unshift(ojbSearch);
        }
        if (!isContain && arrBookmarks.length < 5) {
            arrBookmarks.push(ojbSearch);
        }
        localStorage.setItem(key, JSON.stringify(arrBookmarks));
    }

    hidePageSizeInfoGrid() {
        asapScheduler.schedule(() => {
            jQuery('.mat-paginator-page-size').hide();
        }, 50);
    }

    isNullOrEmpty(data: any) {
        return this.sharedService.isNullOrEmpty(data);
    }

    isNullOrEmptyZero(data: any) {
        return this.sharedService.isNullOrEmptyZero(data);
    }

    focusChange($event: any) {
        if (!this.sharedService.CanChangedTab) {
            asapScheduler.schedule(() => {
                this.selectedTab = this.sharedService.TabSelectedIndex;
            }, 750);
        }
        else {
            this.sharedService.TabSelectedIndex = $event.index;
        }
    }

    /*Add to toogle mobile*/
    /*used for Collect View*/
    isOverCollectView(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }

    getOrientation() {
        if (window.matchMedia('(orientation: portrait)').matches) {
            // you're in PORTRAIT mode
            return 'portrait';
        }
        if (window.matchMedia('(orientation: landscape)').matches) {
            // you're in LANDSCAPE mode
            return 'landscape';
        }
        return '';
    }

    /*end used for Collect View*/
    isOver(): boolean {
        return window.matchMedia(`(max-width: 1140px)`).matches;
    }

    isChromeBrowser() {
        return navigator.userAgent.includes('Chrome');
    }

    isIEBrowser() {
        return navigator.userAgent.includes('MSIE');
    }

    isFireFoxBrowser() {
        return navigator.userAgent.includes('Firefox');
    }

    isSafariBrowser() {
        return navigator.userAgent.includes('Safari') &&
            !navigator.userAgent.includes('Chrome');
    }

    isOperaBrowser() {
        return navigator.userAgent.toLowerCase().includes('op');
    }

    //Detect your browser on Phone
    iPhone() {
        return !!navigator.platform && /iPhone/.test(navigator.platform);
    }

    iPhoneSafari() {
        return /iPhone.+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent) && this.isSafariBrowser();
    }

    iPadSafari() {
        return /iPad.+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent);
    }

    isIOSSafari() {
        return this.platform.IOS && this.platform.SAFARI;
    }

    isAndroidApp() {
        return this.platform.ANDROID && this.sharedService.ViewMode === 'app';
    }

    isPhoneOrTablet = function () {
        return this.platform.IOS;
    }

    isResponsiveToolBar(): boolean {
        return window.matchMedia(`(max-width: 570px)`).matches;
    }

    /*Add to toogle mobile*/
    isTablet(): boolean {
        return window.matchMedia(`(max-width: 980px)`).matches;
    }

    /*Return breakpoints with mediaQuery*/
    isXS(): boolean {
        return window.matchMedia(`(max-width: 599px)`).matches;
    }

    isSM(): boolean {
        return window.matchMedia(`(max-width: 959px)`).matches;
    }

    isMD(): boolean {
        return window.matchMedia(`(max-width: 1279px)`).matches;
    }

    isLG(): boolean {
        return window.matchMedia(`(max-width: 1919px)`).matches;
    }

    // Detect your browser on Phone
    isIOS() {
        return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    }

    // Sidebar Animation
    ltMedium(): boolean {
        return window.matchMedia(`(max-width: 959px)`).matches;
    }

    // Actions Menu
    showActionsMenu() {
        this.actionsMenu = !this.actionsMenu;
    }
    /*end return breakpoints with mediaQuery*/

    displayNoRecords(totalItems: any) {
        let message = '';
        if (totalItems === 0) {
            message = 'No records available';
        }
        asapScheduler.schedule(() => {
            jQuery('tr.k-grid-norecords > td').html(message);
        }, 100);
    }

    displayGridMessage(totalItems: any) {
        let message = '';
        if (totalItems === 0) {
            message = 'No records available';
        }
        return message;
    }

    convertJSONToStringCSV(dataCSV: any) {
        if (dataCSV.dataRows.length > 0) {
            for (let dataRow of dataCSV.dataRows) {
                let dataItem = '';
                for (let dataColumn of dataCSV.dataColumns) {
                    dataItem += dataRow[dataColumn] + ',';
                }
                dataItem = dataItem.replace(/,$/, '');
                dataCSV.dataBody += dataItem + '\r\n';
            }
        }
        return dataCSV.dataBody;
    }

    getDocumentBody(): any {
        return document.body;
    }

    convertStringToJSON(data: any) {
        let dataCSV = {
            dataRows: [],
            dataColumns: [],
            dataBody: ''
        };
        if (!this.isNullOrEmpty(data)) {
            const arrRows = data.split('\r\n');
            if (arrRows.length > 0) {
                dataCSV.dataColumns = arrRows[0].split(',');
                dataCSV.dataBody = arrRows[0] + '\r\n';
                let iRow = 0;
                for (let row of arrRows) {
                    if (iRow > 0) {
                        const arrRow = row.split(',');
                        let newRow = {};
                        let iColumn = 0;
                        for (let dataRow of arrRow) {
                            newRow[dataCSV.dataColumns[iColumn++]] = dataRow;
                        }
                        dataCSV.dataRows.push(newRow);
                    }
                    iRow++;
                }
            }
        }
        return dataCSV;
    }

    confimDeleteItems(confirmComponent: any, dataConfig: any, callbackConfirm: () => void) {
        this.openDialog(confirmComponent, dataConfig).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
            if (res === true) {
                callbackConfirm();
            }
            else {
                this.showLoading = false;
                if (this.selection) {
                    this.selection.clear();
                    this.sharedService.sharedData({ action: 'display-total-items', data: this.selection.selected.length });
                }
            }
        });
    }

    getLocalTimeZoneDate2(data: string) {
        if (!this.isNullOrEmpty(data)) {
            let date: any = this.sharedService.convertDateStringToMoment(data, this.offset, this.isDST);
            if (!this.isNullOrEmpty(this.sharedService.CurrentUTCTimezone)) {
                return date.format(GlobalSettings.Info.DateTime.dateTimePattern) + ' (UTC ' + this.sharedService.CurrentUTCTimezone + ')';
            }
            return date.format(GlobalSettings.Info.DateTime.dateTimePattern);
        }
        return data;
    }

    getFormartDateUTC(data: string) {
        if (!this.isNullOrEmpty(data)) {
            let date: any = this.sharedService.convertDateStringToMoment(data, this.offset, this.isDST);
            return date.format(GlobalSettings.Info.DateTime.dateTimePattern);
        }
        return data;
    }

    getFormartDateUTCReport(data: string, offset: any, isDST: boolean) {
        if (!this.isNullOrEmpty(data)) {
            let date = this.sharedService.convertDateStringToMoment(data, offset, isDST);
            let str = date.format(GlobalSettings.Info.DateTime.dateTimePattern);
            return str + ' (UTC+0.00)';
        }
        return data;
    }

    getLocalTimeZoneDate(data: string) {
        if (!this.isNullOrEmpty(data)) {
            let date: any = moment(data);
            //Get server datetime
            date = moment(date._a);
            return date;
        }
        return data;
    }

    getLocalDate(data: string) {
        if (!this.isNullOrEmpty(data)) {
            let date = this.sharedService.convertDateStringToMoment(data, this.offset, this.isDST);
            if (!this.isNullOrEmpty(date)) {
                date = date.format(GlobalSettings.Info.DateTime.dateTimePattern);
                if (!this.isNullOrEmpty(this.sharedService.CurrentUTCTimezone)) {
                    date = date + ' (UTC ' + this.sharedService.CurrentUTCTimezone + ')';
                }
            }
            return date;
        }
        return data;
    }

    showSearchToolbar() {
        if (this.isSearch) {
            this.isSearch = false;
        }
        else {
            this.isSearch = true;
            asapScheduler.schedule(() => {
                jQuery('.txt-quick-search-control').focus();
            }, 250);
        }
    }

    isResponseView() {
        if (window.matchMedia(`(max-width: 479px)`).matches) {
            return 2;
        }
        if (window.matchMedia(`(max-width: 599px) and (min-width: 480px)`).matches) {
            return 3;
        }
        if (window.matchMedia(`(max-width: 959px) and (min-width: 600px)`).matches) {
            return 4;
        }
        if (window.matchMedia(`(max-width: 1279px) and (min-width: 960px)`).matches) {
            return 5;
        }
        if (window.matchMedia(`(max-width: 1919px) and (min-width: 1280px)`).matches) {
            return 6;
        }
        return 7;
    }

    isSelectedSiteAsync(siteName: any) {
        return new Observable(res => {
            this.router.events.subscribe((e: any) => {
                let isSelectedSite: boolean = false;
                let strUrl = e.url;
                strUrl = strUrl.split('?')[0];
                if (strUrl.indexOf(siteName) !== -1) {
                    isSelectedSite = true;
                }
                res.next(isSelectedSite);
                res.complete();
            });
        });
    }

    isSelectedSite(siteName: any) {
        let strUrl = this.router.url;
        strUrl = strUrl.split('?')[0];
        if (strUrl.indexOf(siteName) !== -1) {
            return true;
        }
        return false;
    }

    logError(error: any, target?: any) {
        if (error.status === 401 && !this.sharedService.isLiveMap()) {
            this.sharedService.sharedData({ action: 'user-unauthorized' });
        }
        else if (error.status === 404) {
            if (!this.isNullOrEmpty(target)) {
                this.router.navigate([`${target}`]);
            }
        }
        if (this.isString(error.message) && !this.isNullOrEmpty(error.message)) {
            if (error.message.includes('401 Unauthorized') && !this.sharedService.isLiveMap()) {
                this.sharedService.sharedData({ action: 'user-unauthorized' });
            }
            //ACCESS_DENIED 
            if (error.message.includes('ACCESS_DENIED')) {
                this.router.navigate(['/access-denied']);
            }
        }
        let errorObject = error;
        while (errorObject['error']) {
            errorObject = errorObject['error'];
        }
        if (!this.isNullOrEmpty(errorObject) && !this.isNullOrEmpty(errorObject.innererror)) {
            if (errorObject.innererror.message.includes('401 Unauthorized') && !this.sharedService.isLiveMap()) {
                this.sharedService.sharedData({ action: 'user-unauthorized' });
            }
            //ACCESS_DENIED 
            if (errorObject.innererror.message.includes('ACCESS_DENIED')) {
                this.router.navigate(['/access-denied']);
            }
        }
    }

    isString(value: any) {
        return typeof value === 'string' || value instanceof String;
    };

    updateBasePermissions(basePermissions: any) {
        for (let scope in basePermissions) {
            if (scope === 'ready') continue;
            let code = basePermissions[scope];
            for (let flag in code) {
                code[flag] = true;
            }
        }
        return basePermissions;
    }

    mergeBasePermissions(basePermissions: any, basePermissions2: any) {
        if (basePermissions === undefined) {
            basePermissions = basePermissions2;
            return basePermissions;
        }
        for (let scope in basePermissions2) {
            if (scope === 'ready') continue;
            if (scope === 'details') continue;
            let code2 = basePermissions2[scope];
            let code = basePermissions[scope];
            for (let flag in code2) {
                code[flag] = code[flag] || code2[flag];
            }
        }
        return basePermissions;
    }

    openDialog(component: any, data: any) {
        return new Observable(obs => {
            const config = new MatDialogConfig();
            config.data = data;
            config.disableClose = true;
            config.width = 'auto';
            config.height = 'auto';
            config.autoFocus = false;
            let dialogRef = this.dialog.open(component, config);
            dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
                obs.next(res);
                obs.complete();
            });
        })
    }

    isViewerOnlyPermission(permissions: any, target: any) {
        return permissions[target] &&
            permissions[target].view &&
            !permissions[target].edit &&
            !permissions[target].delete &&
            !permissions[target].create &&
            !permissions[target].add &&
            !permissions[target].remove &&
            !permissions[target].command;
    }

    gotoLogin() {
        window.location.href = CommonUtility.getOAuthenticationUrl();
    }

    // Handle special characters in an oData query
    handleODataSpecialCharacters(attribute: any): string {
        let result = '';
        result = encodeURIComponent(attribute);
        return result;
    }
}