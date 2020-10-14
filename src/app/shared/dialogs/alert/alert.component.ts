import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedPropertyService } from '../../services/shared-property.service';

@Component({
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {
	public dataConfig: any;
	public title: string = "";
	public template: string = "";
	public okText: string = "";
	constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
		private shared: SharedPropertyService,
		public dialogRef: MatDialogRef<AlertComponent>) {
		this.okText = 'OK';
		this.dataConfig = this.dialogData;
		this.title = this.dataConfig.title;
		this.template = this.dataConfig.template;
		if (!this.shared.isNullOrEmpty(this.dataConfig.okText)) {
			this.okText = this.dataConfig.okText;
		}
	}

	ngOnInit() {
	}
}
