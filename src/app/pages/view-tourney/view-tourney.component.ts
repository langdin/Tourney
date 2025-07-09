import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/player';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-tourney',
  templateUrl: './view-tourney.component.html',
  styleUrls: ['./view-tourney.component.css']
})
export class ViewTourneyComponent implements OnInit {
  players: Player[];
  tourneyId: string;
  rounds: Player[][];
  h1: number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.h1 = 0;
    this.rounds = new Array();
    this.tourneyId = this.activatedRoute.snapshot.params.id;
    this.getPlayers();

  }

  private getPlayers(): void {
    this.playerService.getPlayersByTourney(this.tourneyId).subscribe(data => {
      this.players = data.playersList;
      const length = Math.log2(this.players.length) + 1;
      for (let i = 0; i < length; i++) {
        this.rounds[i] = [];
        for (let j = 0; j < this.players.length; j++) {
          if (this.players[j].bouts[i].boutId !== '') {
            this.rounds[i].push(this.players[j]);
          }
        }
      }
      console.log(this.rounds);
    });
  }

  private getMarginFirst() {
    this.h1 += 3;
    return this.h1;
  }
  private getMarginDouble() {
    this.h1 *= 2;
    return this.h1;
  }

  private getMargin() {
    return this.h1;
  }
}
