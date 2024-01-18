import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-emp',
  templateUrl: './popup-emp.component.html',
  styleUrls: ['./popup-emp.component.scss']
})
export class PopupEmpComponent {
  name: any;

  constructor(public dialogRef: MatDialogRef<PopupEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string},)
     {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
