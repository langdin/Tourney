import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.css']
})
export class MyinfoComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
    this.getUser();
  }

  private getUser() {
    const u = JSON.parse(localStorage.getItem('user'));
    const id = u.id;
    this.authService.getUser(id).subscribe(data => {
      if (data.success) {
        this.user = data.user;
      }
    });
  }

  public updateUser() {
    this.authService.editUser(this.user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Successfully Updated Your Presonal Info', {cssClass: 'alert-success', timeOut: 3000});
      }
    })
  }

}
