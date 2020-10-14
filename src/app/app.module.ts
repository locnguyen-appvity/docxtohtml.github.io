import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgReduxModule } from '@angular-redux/store';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
		AppRoutingModule,
		NgReduxModule,
		MatToolbarModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatMenuModule,
		MatTooltipModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
	// constructor(private store: NgRedux<IAppState>) {
	// 	this.store.configureStore(reducer, INITIAL_STATE);
	// 	GlobalSettings.Info.access_token = 'portal_access_token';
	// 	GlobalSettings.Info.refresh_token = 'portal_refresh_token';
	// 	GlobalSettings.Info.last_login = 'portal_last_login';
	// 	GlobalSettings.Info.code_token = 'portal_code_token';
	// 	GlobalSettings.Info.state_token = 'portal_state_token';
	// }
}
