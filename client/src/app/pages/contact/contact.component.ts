import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string;
  subject: string;
  email: string;
  message: string;

  constructor(
    private mailService: MailService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public sendMail() {
    this.mailService.sendMail(this.name, this.email, this.subject, this.message).subscribe(data => {
      if (data.success) {
        this.router.navigate(['/mail_sent']);
      } else {
        this.flashMessage.show('Couldn\'t send your message', {cssClass: 'alert-warning', timeOut: 3000});
      }
    });
  }

}
