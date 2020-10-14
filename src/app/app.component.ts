import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BaseComponent } from './shared/base.component';
import { SharedPropertyService } from './shared/services/shared-property.service';
import * as fs from './shared/directives/fullscreen.document';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
	public dark: boolean = false;
	public overSidenav: MatSidenav;
	public title: string = "eTask";
	public openSideNav: boolean = true;
	public themeColor = '';
	public fullscreen: boolean = false;
	@ViewChild('overSidenav', { static: false }) set elemOnHTML(elemOnHTML: MatSidenav) {
		if (!!elemOnHTML) {
			this.overSidenav = elemOnHTML;
		}
	}

	constructor(
		public router: Router,
		public shared: SharedPropertyService,
		public dialog: MatDialog,
		@Inject(DOCUMENT) doc: any,
		public platform: Platform,
		private mdIconRegistry: MatIconRegistry,
		private sanitizer: DomSanitizer,
	) {
		super(router, shared, dialog, doc, platform);
		this.registerSVGIcon();
	}

	ngOnInit() {

	}

	registerSVGIcon() {
		this.mdIconRegistry.addSvgIcon('logo', this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/appvity_logo.svg'));
		this.mdIconRegistry.addSvgIcon('logoXs', this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/logoXs.svg'));
		this.mdIconRegistry.addSvgIcon('ic_home', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_home.svg'));
		this.mdIconRegistry.addSvgIcon('ic_menu', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_menu.svg'));
		this.mdIconRegistry.addSvgIcon('ic_create', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_create.svg'));
		this.mdIconRegistry.addSvgIcon('ic_close', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_close.svg'));
		this.mdIconRegistry.addSvgIcon('ic_search', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_search.svg'));
		this.mdIconRegistry.addSvgIcon('ic_settings', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_settings.svg'));
		this.mdIconRegistry.addSvgIcon('ic_invert_colors', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_invert_colors.svg'));
		this.mdIconRegistry.addSvgIcon('ic_arrow_left', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_arrow_left.svg'));
		this.mdIconRegistry.addSvgIcon('ic_arrow_right', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_arrow_right.svg'));
		this.mdIconRegistry.addSvgIcon('ic_arrow_right', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_arrow_right.svg'));
		this.mdIconRegistry.addSvgIcon('ic_dashboard', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_dashboard.svg'));
		this.mdIconRegistry.addSvgIcon('ic_tenants', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_tenants.svg'));
		this.mdIconRegistry.addSvgIcon('ic_tools', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_tools.svg'));
		this.mdIconRegistry.addSvgIcon('ic_support', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_support.svg'));
		this.mdIconRegistry.addSvgIcon('ic_align_left', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_align_left.svg'));
		this.mdIconRegistry.addSvgIcon('ic_fullscreen', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_fullscreen.svg'));
		this.mdIconRegistry.addSvgIcon('ic_fullscreen_exit', this.sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_fullscreen_exit.svg'));
	}

	eventSideNav(event: boolean) {
		console.log(event);
		if (event) {
			this.openSideNav = false;
			this.overSidenav.close()
		} else {
			this.openSideNav = true;
			this.overSidenav.open();
		}
	}

	// Fullscreen
	onFullscreen() {
		this.fullscreen = true;
		fs.setFullScreen(this.fullscreen);
	}

	onFullscreenExit() {
		this.fullscreen = false;
		fs.setFullScreen(this.fullscreen);
	}

	ngOnDestroy() {

	}
}
