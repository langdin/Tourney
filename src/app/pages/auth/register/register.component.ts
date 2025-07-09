import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  register(): void {
    this.authService.registerUser(this.user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now registered and may log in', {cssClass: 'alert-success', timeOut: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeOut: 5000});
        this.router.navigate(['/register']);
      }
    });
  }
}
