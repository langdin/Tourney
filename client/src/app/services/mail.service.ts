import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  // private endpoint = 'http://localhost:3000/api/sendmail/';
  private endpoint = 'https://tourney-digital.herokuapp.com/api/sendmail/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public sendMail(name: string, email: string, subject: string, message: string): Observable<any> {
    return this.httpClient.post(this.endpoint, {name, email, subject, message}, this.httpOptions);
  }
}
