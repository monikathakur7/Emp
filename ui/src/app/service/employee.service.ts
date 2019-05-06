import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals/config/www.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient,
    private server: Globals) { }

  getEmployees() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get<Employee[]>(this.server.serverUrl + "/employees", httpOptions)
      .pipe(
        map(data =>
          data as Employee[]
        ),
        catchError(this.handleError)
      );
  }

  addEmployee(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<Employee[]>(this.server.serverUrl + "/create",data, httpOptions)
      .pipe(
        map(data =>
          data as Employee[]
        ),
        catchError(this.handleError)
      );
  }

  deleteEmployee(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.delete(this.server.serverUrl + "/delete/"+id, httpOptions)
      .pipe(
        map(data =>
          data
        ),
        catchError(this.handleError)
      );
  }

  getSingleEmployee(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get(this.server.serverUrl + "/employee/"+id, httpOptions)
      .pipe(
        map(data =>
          data
        ),
        catchError(this.handleError)
      );
  }

  updateEmployee(id,data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put(this.server.serverUrl + "/update/"+id,data, httpOptions)
      .pipe(
        map(data =>
          data
        ),
        catchError(this.handleError)
      );
  }
  private handleError(error) {
    return throwError(error.message);
  }

}
