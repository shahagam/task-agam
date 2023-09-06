
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

import { PatientService } from '../services/patient.service';
import { PatAddEditComponent } from '../pat-add-edit/pat-add-edit.component';

@Component({
  selector: 'app-pat-status',
  templateUrl: './pat-status.component.html',
  styleUrls: ['./pat-status.component.scss']
})
export class PatStatusComponent implements OnInit {
  patForm: FormGroup;
  status: boolean | undefined;


  constructor( private fb: FormBuilder, private patService: PatientService, private dialogRef: MatDialogRef<PatAddEditComponent>, private coreService: CoreService,
   
   @Inject(MAT_DIALOG_DATA) public data: any, ) {
     this.patForm = this.fb.group({
    
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      status: '',
     
    });
  }

  ngOnInit(): void {
    this.patForm.patchValue(this.data);
    this.status=true;
  }

  onFormSubmit() {
    if (this.patForm.valid) {
      if (this.data) {
        this.patService.updatePatient(this.data.id, this.patForm.value).subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Status updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.patService.addPatient(this.patForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Patient added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

