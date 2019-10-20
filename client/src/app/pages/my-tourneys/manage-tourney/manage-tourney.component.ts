import { Component, OnInit } from '@angular/core';
import { MyTourneysService } from 'src/app/services/my-tourneys.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Tourney } from 'src/app/models/tourney';
import { BoutService } from 'src/app/services/bout.service';
import { Bout } from 'src/app/models/bout';

@Component({
  selector: 'app-manage-tourney',
  templateUrl: './manage-tourney.component.html',
  styleUrls: ['./manage-tourney.component.css']
})
export class ManageTourneyComponent implements OnInit {

  tourneyId: string;
  tourney: Tourney;
  bouts: Bout[];
  mySubscription: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tourneysService: MyTourneysService,
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
    this.tourney = new Tourney();
    this.tourneyId = this.activatedRoute.snapshot.params.id;
    this.bouts = new Array<Bout>();
    this.getBouts();
    this.getTourney();
  }

  private getTourney() {
    this.tourneysService.getTourney(this.tourneyId).subscribe(data => {
      if (data.success) {
        this.tourney = data.tourney;
      }
    });
  }

  private getBouts() {
    this.boutService.getBoutsByTourney(this.tourneyId).subscribe(data => {
      if (data.success) {
        this.bouts = data.boutList;
      }
    });
  }

  private addFirstBout() {
    const bout = new Bout();
    bout.number = this.bouts.length + 1;
    bout.maxNumOfPlayers = this.tourney.numberOfPlayers;
    bout.tourneyId = this.tourneyId;
    if (bout.number > 1) {
      this.flashMessage.show('New bouts can not be added.', { cssClass: 'alert-warning', timeOut: 3000 });
    } else {
      this.boutService.addBout(bout).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeOut: 3000 });

        } else {
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeOut: 3000 });
        }
        this.router.navigate(['/manage_tourney/' + this.tourneyId]);
      });
    }
  }


// tslint:disable-next-line: use-life-cycle-interface
ngOnDestroy() {
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
}
}
