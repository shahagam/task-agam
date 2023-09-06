import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {

  // url ='http://localhost:3000/patients';

  constructor(private _http: HttpClient) {}



  addPatient(data: any): Observable<any> {
    // return this._http.post(this.url, data);
    return this._http.post('http://localhost:3000/patients', data);

  }
  
  updatePatient(id: number, data: any): Observable<any> {
    // return this._http.put(this.url +'/${id}', data);
    return this._http.put(`http://localhost:3000/patients/${id}`, data);

  }

  getPatientList(): Observable<any> {
    // return this._http.get(this.url);
    return this._http.get('http://localhost:3000/patients');

  }

  deletePatient(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/patients/${id}`);
  }

}




// https://patientmanagement-b8faa-default-rtdb.firebaseio.com/patients.json
