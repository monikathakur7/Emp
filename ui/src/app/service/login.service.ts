import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals/config/www.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
    private server: Globals) { }

  login(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(this.server.url + "/login", data, httpOptions)
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
