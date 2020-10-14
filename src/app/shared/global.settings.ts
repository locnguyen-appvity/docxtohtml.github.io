import { environment } from '../../environments/environment';

export class GlobalSettings {
    static Info = {
        Title: 'Portal eTask',
        Server: '/',
        LandingPage: environment.landingPage,
        Account: {
            type: 'authorization_code',
            id: '624869d825aed2747f6cbd8eabe47f049d8e89688e2941267ebc7d2e76619e75',
            refresh: 'refresh_token',
            'refreshBeforeSeconds': 60,
        },
        Language: {
            lcid: 1033,
            key: 'en-US'
        },
        Grid: {
            pageSize: 10,
            listPageSize: 20,
            pageInfo: {
                buttonCount: 3,
                info: true,
                type: 'numeric',
                previousNext: true
            },
            skip: 0,
            filter: '',
            pageSizes: true,
        },
        delayTimer: {
            valueChanges: 500,
            actions: 50,
            notification: 5000,
            appRefresh: 30000,
            keyboard: 5000,
            loadControls: 3000,
            restored: 500,
        },
        DateTime: {
            dateTimePattern: 'MMM DD YYYY, h:mm:ss A',
            dateTimePattern1: 'MM/DD/YYYY, h:mm A',
            dateTimePattern2: 'MMM DD, YYYY h:mm:ss A',
            dateTimePattern3: 'MMM DD YYYY, h:mm:ss A (UTCZ)',
            shortDatePattern: 'MMM DD YYYY',
            shortDatePattern1: 'MMMM DD, YYYY',
            shortDatePattern2: 'MMMM DD YYYY',
            shortDatePattern3: 'MMMM DD',
            shortDatePattern4: 'MMM DD',
            shortDatePattern5: 'MM/DD/YYYY',
            dateTimePattern6: 'MM/DD/YYYY h:mm A',
            timePattern: 'h:mm:ss A',
            timePatternAM: 'h:mm A',
            timePatternAM2: 'hh:mm a'
        },
        code_token: 'portal_code_token',
        state_token: 'portal_state_token',
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        last_login: 'last_login',
        Version: {
            name: 'Portal eTask',
            version: '1.0.0.1'
        }
    }
    
}
