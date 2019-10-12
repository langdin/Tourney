import { Component, OnInit } from '@angular/core';
import { MyTourneysService } from 'src/app/services/my-tourneys.service';
import { Tourney } from 'src/app/models/tourney';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tourneys',
  templateUrl: './my-tourneys.component.html',
  styleUrls: ['./my-tourneys.component.css']
})
export class MyTourneysComponent implements OnInit {

  tourneys: Tourney[];
  currentUser: User;
  userId: string;

  constructor(
    private myTourneysService: MyTourneysService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = new User();
    this.tourneys = new Array<Tourney>();
    if (this.isLoggedIn()) {
      this.userId = this.currentUser['id'];
      this.displayUserTourneys();
    } else {
      this.router.navigate(['/login']);
    }
    console.log(this.currentUser);
  }

  public displayUserTourneys() {
    this.myTourneysService.getUserTourneys({userId: this.userId}).subscribe(data => {
      this.tourneys = data.tourneysList;
      console.log(this.tourneys);
    });
  }

  isLoggedIn(): boolean {
    const result = this.authService.loggedIn();
    if (result) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
    return result;
  }
}
