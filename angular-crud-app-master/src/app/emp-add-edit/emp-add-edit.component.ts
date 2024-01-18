import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { Education } from '../shared/models/education';
import { Company } from '../shared/models/company';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { timer } from 'rxjs';

const observable = timer (3000);

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})


export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: Education[] = [];

  company: Company[] = [];

  showSpinner = false;


  

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      catEducationId: new FormControl('', [Validators.required]),
      catCompanyId: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      package: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.getCompanyList();
    this.getEducationList();
  }

  get f(){
    return this.empForm.controls;
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.showSpinner =  true;
        let boton = <HTMLButtonElement> document.getElementById('miBoton');
        boton.disabled = true; // el botón está deshabilitado
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              observable.subscribe (x => {
                this.showSpinner = false;
                this._dialogRef.close(true);
                this._coreService.openSnackBar('Employee detail updated!');
              });

             
            },
            error: (err: any) => {
              console.error(err);
              this.showSpinner = false;
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this.showSpinner =  true;
            let boton = <HTMLButtonElement> document.getElementById('miBoton');
            boton.disabled = true; // el botón está deshabilitado
            observable.subscribe (x => {
              this.showSpinner = false;
              this._dialogRef.close(true);
              this._coreService.openSnackBar('Employee detail Add');
            });
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  nCatCompanyIdSelected(id : number)
  {
    console.log(id);
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
