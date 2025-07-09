import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Player } from 'src/app/models/player';
import { BoutService } from 'src/app/services/bout.service';
import { Bout } from 'src/app/models/bout';
import { Point } from 'src/app/models/point';
import { BoutID } from 'src/app/models/boutids';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  @Input() title: string;
  // player
  player: Player;
  playerId: string;
  // bout
  @Input() boutId: string;
  bout: Bout;
  numOfPlayers: number;
  boutNum: number; // number of current bout
  // score in current bout for display
  score: number;
  @Output() getPlayers: EventEmitter<any> = new EventEmitter();

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private boutService: BoutService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    //this.title = this.activatedRoute.snapshot.data.title;
    // this.playerId = this.activatedRoute.snapshot.params.playerid;
    //this.boutId = this.activatedRoute.snapshot.params.boutid;
    this.player = new Player();
    this.getBout();
    // if (this.title === 'Edit Participant') {
    //   this.getPlayer();
    // }
  }

  public getPlayer(id: string) {
    console.log('get player');
    this.playerService.getPlayersById(id).subscribe(data => {
      if (data.success) {
        this.player = data.player;
        this.score = this.player.points[this.boutNum].score;
      } else {
        this.router.navigate(['/my_tourneys']);
      }
    });
  }

  private getBout() {
    this.boutService.getBoutById(this.boutId).subscribe(data => {
      if (data.success) {
        this.bout = data.bout;
        this.boutNum = this.bout.number - 1;
        let length = 0;
        switch (this.bout.maxNumOfPlayers) {
          case 4:
            length = 3;
            break;
          case 8:
            length = 4;
            break;
          case 16:
            length = 5;
            break;
        }
        this.player.points = new Array<Point>(length).fill({ score: 0 });
        this.player.bouts = new Array<BoutID>(length).fill({ boutId: '' });
      } else {
        this.router.navigate(['/my_tourneys']);
      }
    });
  }

  public clearForm() {
    this.player = new Player();
    let length = 0;
    switch (this.bout.maxNumOfPlayers) {
      case 4:
        length = 3;
        break;
      case 8:
        length = 4;
        break;
      case 16:
        length = 5;
        break;
    }
    this.player.points = new Array<Point>(length).fill({ score: 0 });
    this.player.bouts = new Array<BoutID>(length).fill({ boutId: '' });
  }

  public onDetailsPageSubmit() {
    // assign current score and boutID
    this.player.points[this.boutNum] = { score: this.score };
    this.player.bouts[this.boutNum] = { boutId: this.boutId };
    if (this.title === 'Add Participant') {
      this.playerService.addPlayer(this.player, this.boutNum).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeOut: 3000 });
          this.router.navigate(['/manage_bout/' + this.boutId]);
        }
      });
    } else if (this.title === 'Edit Participant') {
      this.playerService.updatePlayer(this.player).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeOut: 3000 });
          this.router.navigate(['/manage_bout/' + this.boutId]);
        }
      });
    }
    this.getPlayers.emit();
  }

}
