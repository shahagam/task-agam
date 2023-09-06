import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-pat-add-edit',
  templateUrl: './pat-add-edit.component.html',
  styleUrls: ['./pat-add-edit.component.scss'],
})
export class PatAddEditComponent implements OnInit {
  patForm: FormGroup;
  selectedOption = 'ACTIVE';

  constructor( private fb: FormBuilder, private patService: PatientService, private dialogRef: MatDialogRef<PatAddEditComponent>,  private coreService: CoreService, 
   
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
  }

  onFormSubmit() {
    if (this.patForm.valid) {
      if (this.data) {
        this.patService.updatePatient(this.data.id, this.patForm.value).subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Patient detail updated!');
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
