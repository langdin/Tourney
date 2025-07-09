import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyTourneysService } from 'src/app/services/my-tourneys.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Tourney } from 'src/app/models/tourney';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-tourney-details',
  templateUrl: './my-tourney-details.component.html',
  styleUrls: ['./my-tourney-details.component.css']
})
export class MyTourneyDetailsComponent implements OnInit {
  @Input() title: string;
  @Input() isDisabled: boolean;
  @Input() tId: string;
  @Output() getTourneys: EventEmitter<any> = new EventEmitter();

  tourney: Tourney;
  currentUser: User;
  tourneyId: string;
  // dropdown text
  ddNum: string;
  ddStatus: string;
  //
  form: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tourneyService: MyTourneysService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    //this.tourneyId = this.activatedRoute.snapshot.params.id;
    //this.title = this.activatedRoute.snapshot.data.title;
    // if (this.title === 'Edit Tourney') {
    //   this.getTourney();
    // }
    this.clearForm();
  }

  public getTourney(id) {
    this.tourneyService.getTourney(id).subscribe(data => {
      if (data.success) {
        this.tourney = data.tourney;
        this.ddStatus = this.tourney.status.toString();
        this.ddNum = this.tourney.numberOfPlayers.toString();
      }
    });
  }

  public clearForm() {
    this.tourney = new Tourney();
    this.tourney.description = '';
    this.ddNum = 'Select Number Of Participants';
    this.ddStatus = 'Select Status';
  }

  public onDetailsPageSubmit() {
    if (this.isNameEmpty()) {
      return;
    }
    this.tourney.ownerId = this.currentUser['id'];
    this.tourney.numberOfPlayers = +this.ddNum;
    this.tourney.status = this.ddStatus;
    if (this.title === 'Add Tourney') {
      // Add New Tourney
      this.tourneyService.addTourney(this.tourney).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeOut: 3000 });
          this.router.navigate(['/my_tourneys']);
        } else {
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeOut: 3000 });
          this.router.navigate(['/my_tourneys/add']);
        }
      });
    } else {
      // Update Tourney
      this.tourneyService.updateTourney(this.tourney).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeOut: 3000 });
          this.router.navigate(['/my_tourneys']);
        } else {
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeOut: 3000 });
          this.router.navigate(['/my_tourneys/edit/' + this.tourney._id]);
        }
      });
    }
    this.getTourneys.emit();
  }

  public selectStatus(status: string) {
    this.ddStatus = status;
  }

  private isLoggedIn(): boolean {
    const result = this.authService.loggedIn();
    if (result) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
    return result;
  }

  public selectNumOfPlayers(num: string) {
    this.ddNum = num;
  }

  public isNameEmpty() {
    this.tourney.name = this.tourney.name.trim();
    if (this.tourney.name.length === 0) {
      return true;
    }
    return false;
  }
}
