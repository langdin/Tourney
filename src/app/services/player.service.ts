import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private user: User;
  private authToken: any = null;

  //  private endpoint = 'http://localhost:3000/api/players/';
  private endpoint = 'https://tourney-digital.herokuapp.com/api/players/';

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


  public getPlayersByBout(boutId: string): Observable<any> {
    this.loadToken();
    return this.httpClient.get(this.endpoint + 'by_bout/' + boutId, this.httpOptions);
  }

  public getPlayersByTourney(tourneyId: string): Observable<any> {
    return this.httpClient.get(this.endpoint + 'by_tourney/' + tourneyId, this.httpOptions);
  }

  public addPlayer(player: Player, boutNum: number): Observable<any> {
    this.loadToken();
    return this.httpClient.post(this.endpoint + 'add/' + boutNum, player, this.httpOptions);
  }

  public getPlayersById(id: string): Observable<any> {
    this.loadToken();
    return this.httpClient.get(this.endpoint + id, this.httpOptions);
  }

  public updatePlayer(updatedPlayer: Player): Observable<any> {
    this.loadToken();
    return this.httpClient.post(this.endpoint + 'edit/' + updatedPlayer._id, updatedPlayer, this.httpOptions);
  }

  public deletePlayers(id: string): Observable<any> {
    this.loadToken();
    return this.httpClient.get(this.endpoint + 'delete/' + id, this.httpOptions);
  }

  private loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}
