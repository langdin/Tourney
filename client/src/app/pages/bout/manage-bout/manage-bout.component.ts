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

  bout: Bout;
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private boutService: BoutService,
    private flashMessage: FlashMessagesService,
    private router: Router
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute =  () => {
        return false;
      };

      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
     }

  ngOnInit() {
    this.nextBoutId = '';
    this.btnText = 'Confirm Winners';
    this.bout = new Bout();
    this.players = new Array<Player>();
    this.boutId = this.activatedRoute.snapshot.params.id;
    this.getBout();
    this.getPlayers();
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
  }

  private getBout() {
    this.boutService.getBoutById(this.boutId).subscribe(data => {
      if (data.success) {
        this.bout = data.bout;
        localStorage.setItem('maxNumOfPlayers', '' + this.bout.maxNumOfPlayers );
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 3000});
        this.router.navigate(['/my_tourneys']);
      }
    });
  }

  private getPlayers() {
    this.playerService.getPlayersByBout(this.boutId).subscribe(data => {
      if (data.success) {
        this.players = data.playersList;
        //
        console.log(this.players);
        this.ddNames = new Array<string>(this.players.length);
        if (this.players.length > 1) {
          this.ddNames.fill('Pick a winner');
        } else if (this.players.length === 1) {
          this.ddNames.fill('Winner of the Tournament');
        }

        if (this.players.length === 2) {
          this.btnText = 'Confirm Tournament Winner';
        }
        this.players.forEach(player => {

          if (player.bouts[this.bout.number].boutId !== '') {
            this.nextBoutId = player.bouts[this.bout.number].boutId;
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

      if (player.bouts[this.bout.number].boutId !== '') {
        this.ddNames.push(player.name);
        this.ddNames.push(player.name);
      }
    });
  }

  private confirmWinners() {
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

    // if next bout ID is empty and user picked all winners for the bout
    if (this.winners.length === this.players.length / 2 && this.nextBoutId === '') {
      // proceed
      this.proceedToNextBout();
    } else {
      // else go to next bout
      this.router.navigate(['/manage_bout/' + this.nextBoutId]);
    }
    // console.log(this.winners);
  }


  private proceedToNextBout() {
    const nextBout = new Bout();
    nextBout.number = this.bout.number + 1;
    nextBout.maxNumOfPlayers = this.bout.maxNumOfPlayers / 2;
    nextBout.tourneyId = this.bout.tourneyId;

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
              // success
            } else {
              this.flashMessage.show(dataP.msg, { cssClass: 'alert-danger', timeOut: 3000 });
              this.router.navigate(['/manage_tourney/' + this.bout.tourneyId]);
            }
          });
        });
        this.router.navigate(['/manage_bout/' + nextBoutId]);

      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeOut: 3000 });
        this.router.navigate(['/manage_tourney/' + this.bout.tourneyId]);
      }
    });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
