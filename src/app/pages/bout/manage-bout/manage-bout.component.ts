import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BoutService } from 'src/app/services/bout.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Bout } from 'src/app/models/bout';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-manage-bout',
  templateUrl: './manage-bout.component.html',
  styleUrls: ['./manage-bout.component.css']
})
export class ManageBoutComponent implements OnInit {

  boutObj: Bout;
  boutId: string;
  players: Player[];
  // dropdown button name
  ddNames: string[];
  // array of winners
  winners: Player[];
  // confirm button clicked
  clicked: boolean;
  // button text
  btnText: string;
  // next bout exist
  nextBoutId: string;

  // for reload purposes
  mySubscription: any;

  title: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private boutService: BoutService,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.nextBoutId = '';
    this.btnText = 'Confirm Winners';
    this.boutObj = new Bout();
    this.players = new Array<Player>();
    this.boutId = this.activatedRoute.snapshot.params.id;
    this.getBout();
    localStorage.setItem('boutId', this.boutId);
    this.winners = new Array<Player>();
    this.clicked = false;
  }

  private selectWinner(chosen: Player) {
    const index = this.players.indexOf(chosen);
    if (index % 2 !== 0) {
      this.ddNames[index - 1] = chosen.name;
    } else {
      this.ddNames[index] = chosen.name;
    }
    // console.log(this.ddNames);
  }

  public getBout() {
    this.boutService.getBoutById(this.boutId).subscribe(data => {
      if (data.success) {
        this.boutObj = data.bout;
        localStorage.setItem('maxNumOfPlayers', '' + this.boutObj.maxNumOfPlayers);
        this.getPlayers();
        return this.boutObj;
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-warning', timeOut: 3000 });
        this.router.navigate(['/my_tourneys']);
      }
    });
  }

  private getPlayers() {
    this.playerService.getPlayersByBout(this.boutId).subscribe(data => {
      if (data.success) {
        // get all players from current bout
        this.players = data.playersList;
        //
        // populate dropdowns
        this.ddNames = new Array<string>(this.players.length);
        if (this.players.length > 1) {
          this.ddNames.fill('Pick a winner');
        } else if (this.players.length === 1) {
          this.ddNames.fill('Winner of the Tournament');
        }

        if (this.players.length === 2 && this.boutObj.maxNumOfPlayers === this.players.length) {
          this.btnText = 'Confirm Tournament Winner';
        }
        if (this.boutObj.maxNumOfPlayers === 1) {
          return;
        }
        this.players.forEach(player => {

          if (player.bouts[this.boutObj.number].boutId !== '') {
            this.nextBoutId = player.bouts[this.boutObj.number].boutId;
            this.btnText = 'Go to the Next Round';

            this.ddNames = new Array<string>();
            this.getPlayersFromNextBout();
          }
        });
      }
    });
  }

  private getPlayersFromNextBout() {
    this.players.forEach(player => {

      if (player.bouts[this.boutObj.number].boutId !== '') {
        this.ddNames.push(player.name);
        this.ddNames.push(player.name);
      }
    });
  }

  public confirmWinners() {
    // button clicked
    this.clicked = true;
    // empty winners array
    this.winners.length = 0;
    // find players and add to winners array;
    this.ddNames.forEach(name => {
      if (this.players.find(x => x.name === name) && !this.winners.find(x => x.name === name)) {
        this.winners.push(this.players.find(x => x.name === name));
      }
    });

    this.players.forEach(player => {
      if (this.ddNames.includes(player.name)) {

      }
    });
    // if havent chosen winners
    if (this.ddNames.filter(x => x === 'Pick a winner').length === this.players.length) {
      return;
    }

    // if next bout ID is empty and user picked all winners for the bout
    if (this.winners.length === this.players.length / 2 && this.nextBoutId === '') {
      // proceed
      this.proceedToNextBout();
    } else {
      // else go to next bout
      console.log(this.nextBoutId);
      this.router.navigateByUrl('/manage_bout/' + this.nextBoutId);
    }
  }


  private proceedToNextBout() {
    const nextBout = new Bout();
    nextBout.number = this.boutObj.number + 1;
    nextBout.maxNumOfPlayers = this.boutObj.maxNumOfPlayers / 2;
    nextBout.tourneyId = this.boutObj.tourneyId;

    // create next bout
    this.boutService.addBout(nextBout).subscribe(data => {
      if (data.success) {
        // if success
        const nextBoutId = data.bout['_id'];
        // add players to new bout
        this.winners.forEach(winner => {
          // update players bouts array
          // add next bout id to bouts array
          winner.bouts[nextBout.number - 1].boutId = nextBoutId;
          this.playerService.updatePlayer(winner).subscribe(dataP => {
            if (dataP.success) {

              console.log(nextBoutId);
              this.router.navigate(['/manage_bout/' + nextBoutId]);
            } else {
              this.flashMessage.show(dataP.msg, { cssClass: 'alert-danger', timeOut: 3000 });
              this.router.navigate(['/manage_tourney/' + this.boutObj.tourneyId]);
            }
          });
        });

      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeOut: 3000 });
        this.router.navigate(['/manage_tourney/' + this.boutObj.tourneyId]);
      }
    });
  }

  public callPlayerDetails(title: string) {
    this.title = title;
  }
}
