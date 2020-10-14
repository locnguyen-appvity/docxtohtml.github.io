import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Directive & Pipe
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { SafeHtmlPipe } from './directives/safehtml.pipe';
import { DatexPipe } from './directives/date.extension.pipe';
import { AlertComponent } from './dialogs/alert/alert.component';

// Material Module
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

const sharedComponent = [
	DatexPipe,
	SafeHtmlPipe,
	AutoFocusDirective,
	AlertComponent
]

@NgModule({
	declarations: [sharedComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		ScrollingModule,
		MatDialogModule,
		MatToolbarModule,
		SharedRoutingModule,
		MatTooltipModule
	]
})
export class SharedModule { }
