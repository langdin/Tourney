import { Component, OnInit } from '@angular/core';
import { MyTourneysService } from 'src/app/services/my-tourneys.service';
import { Tourney } from 'src/app/models/tourney';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, NavigationEnd } from '@angular/router';
import { BoutService } from 'src/app/services/bout.service';

@Component({
  selector: 'app-my-tourneys',
  templateUrl: './my-tourneys.component.html',
  styleUrls: ['./my-tourneys.component.css']
})
export class MyTourneysComponent implements OnInit {

  tourneys: Tourney[];
  currentUser: User;
  userId: string;
  tourneyId: string;

  // modal dialog
  modalHeader: string;
  modalBody: string;
  modalBtn: string;

  title: string;
  isDisabled: boolean;

  mySubscription: any;

  constructor(
    private tourneysService: MyTourneysService,
    private boutService: BoutService,
    private authService: AuthService,
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
    this.currentUser = new User();
    this.tourneys = new Array<Tourney>();
    this.isLoggedIn();
    this.userId = this.currentUser['id'];
    this.displayUserTourneys();
    this.restModal();
  }

  private displayUserTourneys() {
    this.tourneysService.getUserTourneys({userId: this.userId}).subscribe(data => {
      this.tourneys = data.tourneysList;
    });
  }

  isLoggedIn(): boolean {
    const result = this.authService.loggedIn();
    if (result) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
    return result;
  }

  private getId(id: string) {
    this.tourneyId = id;
    this.tourneys.forEach(tourney => {
      if (tourney['_id'] === this.tourneyId) {
        this.boutService.getBoutsByTourney(this.tourneyId).subscribe(data => {
          if (data.boutList.length !== 0) {
            console.log(data.boutList);
            this.modalHeader = 'Warning';
            this.modalBody = 'You have to delete all bouts from this Tourney first.';
            this.modalBtn = 'Ok';
          } else {
            this.restModal();
          }
        });
      }
    });
  }

  private restModal() {
    this.modalHeader = 'Are you sure?';
    this.modalBody = 'This action cannot be undone';
    this.modalBtn = 'Delete';
  }

  private callTourneyDetails(title: string, dis: boolean) {
    this.title = title;
    this.isDisabled = dis;
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
