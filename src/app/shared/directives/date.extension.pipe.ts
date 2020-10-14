import { Pipe, PipeTransform } from '@angular/core';
import "moment";
import * as moment_ from "moment-timezone";
const moment = moment_;

@Pipe({
    name: 'datex'
})

export class DatexPipe implements PipeTransform {
    transform(value: any, format: string = ""): string {
        if (value === "" || value === null || value === undefined) {
            return "";
        }
        // Try and parse the passed value.
        var momentDate = moment(value);

        // If moment didn't understand the value, return it unformatted.
        if (!momentDate.isValid()) return value;

        switch (format) {
            case "fullDateTimePattern":
                return momentDate.format("dddd, MMMM DD, hh:mma");
            case "dateTimePattern":
                return momentDate.format("MMM DD YYYY, h:mm:ss A");
            case "dateTimePattern1":
                return momentDate.format("MM/DD/YYYY, hh:mm A");
            case "dateTimePattern2":
                return momentDate.format("MM/DD/YYYY hh:mm A");
            case "dateTimePattern3":
                return momentDate.format("MMM DD YYYY h:mm:ss A");
            case "dateTimePattern4":
                return momentDate.format("MM/DD/YYYY hh:mm A");
            case "dateTimePattern5":
                return momentDate.format("MMM DD YYYY hh:mm:ss A");
            case "dateTimePattern6":
                return momentDate.format("MMM DD, YYYY hh:mm A");
            case "dateTimePattern7":
                return momentDate.format("LLLL");
            case "shortDatePattern":
                return momentDate.format("MMM DD YYYY");
            case "shortDatePattern1":
                return momentDate.format("MMMM DD, YYYY");
            case "shortDatePattern2":
                return momentDate.format("MMMM DD YYYY");
            case "shortDatePattern3":
                return momentDate.format("MMMM DD");
            case "shortDatePattern4":
                return momentDate.format("MMM DD");
            case "shortDatePattern5":
                return momentDate.format("MM/DD/YYYY");
            // return momentDate.format("MMM DD YYYY, h:mm:ss A");
            case "shortDatePattern6":
                return momentDate.format("DD MMM YYYY");
            case "timePattern":
                return momentDate.format("h:mm:ss A");
            case "timePatternAM":
                return momentDate.format("h:mm A");
            case "timePatternAM2":
                return momentDate.format("hh:mm A");
            case "timePatternAM3":
                return momentDate.format("hh:mm:ss A");
            // case "fromNow24":
            //     return this.getDate24Ago(momentDate);
            default:
                // Otherwise, return the date formatted as requested.
                return momentDate.format(format);
        }
    }

    // getDate24Ago(momentDate: any) {
    //     let timerCreate = momentDate._d.getTime();
    //     let timer36h = 36 * 60 * 60 * 1000;
    //     let now = moment();
    //     const timerNow = now._d.getTime();
    //     const timer = timerNow - timerCreate;
    //     if (timer > timer36h) {
    //         return momentDate.format("MM/DD/YYYY");
    //     }
    //     let timer22h = 22 * 60 * 60 * 1000;
    //     if (timer >= timer22h) {
    //         return "a day ago";
    //     }
    //     let timer90mins = 1.5 * 60 * 60 * 1000;
    //     if (timer >= timer90mins) {
    //         let hours = Math.floor(timer / timer90mins);
    //         return `${hours} hours ago`;
    //     }
    //     let timer45mins = 45 * 60 * 1000;
    //     if (timer >= timer45mins) {
    //         return "an hour ago";
    //     }
    //     let timer90secs = 1.5 * 60 * 1000;
    //     if (timer >= timer90secs) {
    //         let minutes = Math.floor(timer / timer90secs);
    //         return `${minutes} minutes ago`;
    //     }
    //     let timer45secs = 45 * 1000;
    //     if (timer >= timer45secs) {
    //         return "a minute ago";
    //     }
    //     return "a few seconds ago";
    // }
}