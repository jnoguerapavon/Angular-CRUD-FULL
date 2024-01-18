import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Company } from 'src/app/shared/models/company';
import { Education } from 'src/app/shared/models/education';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.scss']
})





export class EmpDetailsComponent implements OnInit  {
  empForm: FormGroup;
 


  education: Education[] = [];

  company: Company[] = [];



  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: new FormControl({ value: '', disabled: true}),
      lastName: new FormControl({ value: '', disabled: true}),
      email: new FormControl({ value: '', disabled: true}),
      dob: new FormControl({ value: '', disabled: true}),
      gender: new FormControl({ value: '', disabled: true}),
      catEducationId: new FormControl({ value: '', disabled: true}),
      catCompanyId: new FormControl({ value: '', disabled: true}),
      experience: new FormControl({ value: '', disabled: true}),
      package: new FormControl({ value: '', disabled: true}),
    });
  }

  get f(){
    return this.empForm.controls;
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.getCompanyList();
    this.getEducationList();
  }


  submit(){
    console.log(this.empForm.value);
  }


  getCompanyList() {
    this._empService.getCompanyList().subscribe({
      next: (res) => {
        this.company= res;
      },
      error: console.log,
    });
  }


 

  getEducationList() {
    this._empService.getEducationList().subscribe({
      next: (res) => {
        this.education= res;
      },
      error: console.log,
    });
  }


}




