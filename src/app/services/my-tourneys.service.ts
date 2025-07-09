import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tourney } from '../models/tourney';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MyTourneysService {
  private user: User;
  private authToken: any = null;

  // private endpoint = 'http://localhost:3000/api/tourneys/';
  private endpoint = 'https://tourney-digital.herokuapp.com/api/tourneys/';

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

  public getAllTourneys(): Observable<any> {
    return this.httpClient.get(this.endpoint, this.httpOptions);
  }

  public getUserTourneys(userId: any): Observable<any> {
    this.loadToken();
    return this.httpClient.post(this.endpoint + 'my', userId, this.httpOptions);
  }

  public addTourney(tourney: Tourney): Observable<any> {
    this.loadToken();
    return this.httpClient.post(this.endpoint + 'add', tourney, this.httpOptions);
  }

  public updateTourney(tourney: Tourney): Observable<any> {
    this.loadToken();
    return this.httpClient.post(this.endpoint + 'edit/' + tourney._id, tourney, this.httpOptions);
  }

  public getTourney(tourneyId: string): Observable<any> {
    return this.httpClient.get(this.endpoint + tourneyId, this.httpOptions);
  }

  public deleteTourney(tourneyId: string): Observable<any> {
    this.loadToken();
    return this.httpClient.get(this.endpoint + 'delete/' + tourneyId, this.httpOptions);
  }

  private loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}
