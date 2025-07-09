import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bout } from '../models/bout';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class BoutService {
  private user: User;
  private authToken: any = null;
  private test: any = null;

  // private endpoint = 'http://localhost:3000/api/bouts/';
  private endpoint = 'https://tourney-digital.herokuapp.com/api/bouts/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) {
    this.user = new User();
  }

  public getBoutById(id: string): Observable<any> {
    this.loadToken();
    return this.httpClient.get(this.endpoint + id, this.httpOptions);
  }

  public getBoutsByTourney(tourneyId: string): Observable<any> {
    this.loadToken();
    return this.httpClient.get(this.endpoint + 'by_tourney/' + tourneyId, this.httpOptions);
  }

  public addBout(bout: Bout): Observable<any> {
    this.loadToken();
    return this.httpClient.post(this.endpoint + 'add', bout, this.httpOptions);
  }

  // public deleteBout(boutId: string): Observable<any> {
  //   this.loadToken();
  //   return this.httpClient.get(this.endpoint + 'delete/' + boutId, this.httpOptions);
  // }

  private loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}
