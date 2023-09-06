import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from './services/patient.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { PatAddEditComponent } from './pat-add-edit/pat-add-edit.component';
import { PatStatusComponent } from './pat-status/pat-status.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isButtonActive: boolean = true;
  editMode: boolean = false;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phoneNo',
    'action',
    'status',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private dialog: MatDialog, private patService: PatientService, private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getPatientList();
  }

  openAddEditPatForm() {
    const dialogRef = this.dialog.open(PatAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPatientList();
           }
          //  console.log(FormData);
        },
    });
  }

  getPatientList() {
    this.patService.getPatientList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  toggleButtonState() {
    this.isButtonActive = !this.isButtonActive;
    this.editMode = true;
    
  }
  deletePatient(id: number) {
    this.patService.deletePatient(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Patient deleted!');
        this.getPatientList();
   
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(PatAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPatientList();
        }
      },
    });
  }
  openStatusForm(data: any) {
    const dialogRef = this.dialog.open(PatStatusComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPatientList();
        }
      },
    });
  }

  

}
