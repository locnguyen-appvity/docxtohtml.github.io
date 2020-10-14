import {
    CanDeactivate, ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { Injectable, Inject } from '@angular/core';
//for dialog
import { DOCUMENT } from "@angular/common";
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from "rxjs";
import { AlertComponent } from '../dialogs/alert/alert.component';

@Injectable({
    providedIn: "root"
})
export class LeaveOutValidate<T extends any> implements CanDeactivate<T>{
    constructor(public dialog: MatDialog,
        @Inject(DOCUMENT) doc: any) {
        dialog.afterOpen.subscribe((ref: MatDialogRef<any>) => {
            if (!doc.body.classList.contains('no-scroll')) {
                doc.body.classList.add('no-scroll');
            }
        });
        dialog.afterAllClosed.subscribe(() => {
            doc.body.classList.remove('no-scroll');
        });
    }

    canDeactivate(component: T, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (component && !component.canDeactivate()) {
            this.showModelDialog();
            return false;
        }
        return true;
    }

    showModelDialog() {
        let dataConfig = {
            title: "Warning",
            template: "You have unsaved changes. Please save or cancel your changes."
        };
        let config = new MatDialogConfig();
        config.data = dataConfig;
        config.disableClose = true;
        config.width = 'auto';
        config.height = 'auto';
        this.dialog.open(AlertComponent, config);
    }
}