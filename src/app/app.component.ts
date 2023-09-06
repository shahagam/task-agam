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

  displayedColumns: string[] = [ 'id','firstName','lastName','email','phoneNo','action','status', ];
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
                                              // Open a dialog
    dialogRef.afterClosed().subscribe({
                                        // subscribe to the afterClosed()
      next: (val) => {
                                        // next is property to callback function,executed after dialog closed. 
                                        //(val) passed from dialog
        if (val) {
                                        //checks if a value (val)
          this.getPatientList();
                                        //fetching list of patients 
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
      //event =target element/value property, HTMLInputElement= TypeScript recognizes as input.
    this.dataSource.filter = filterValue.trim().toLowerCase();
      //removing leading and trailing spaces with trim()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      //navigate to first page of table
      // this.coreService.openSnackBar('you searched for' );
    }
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
