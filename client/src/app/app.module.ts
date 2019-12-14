import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HeaderComponent } from './partials/header/header.component';
import { BasePageComponent } from './partials/base-page/base-page.component';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';

// Route Guards
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { MyTourneysComponent } from './pages/my-tourneys/my-tourneys.component';
import { MyTourneyDetailsComponent } from './pages/my-tourneys/my-tourney-details/my-tourney-details.component';
import { MyTourneyDeleteComponent } from './pages/my-tourneys/my-tourney-delete/my-tourney-delete.component';
import { ManageTourneyComponent } from './pages/my-tourneys/manage-tourney/manage-tourney.component';
import { ManageBoutComponent } from './pages/bout/manage-bout/manage-bout.component';
import { PlayerDetailsComponent } from './pages/player/player-details/player-details.component';
import { BoutDeleteComponent } from './pages/bout/bout-delete/bout-delete.component';
import { AboutComponent } from './pages/about/about.component';
import { AllTourneysComponent } from './pages/all-tourneys/all-tourneys.component';
import { ViewTourneyComponent } from './pages/view-tourney/view-tourney.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MailSentComponent } from './pages/contact/mail-sent/mail-sent.component';

export function jwtTokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BasePageComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MyTourneysComponent,
    MyTourneyDetailsComponent,
    MyTourneyDeleteComponent,
    ManageTourneyComponent,
    ManageBoutComponent,
    PlayerDetailsComponent,
    BoutDeleteComponent,
    AboutComponent,
    AllTourneysComponent,
    ViewTourneyComponent,
    ContactComponent,
    MailSentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [FlashMessagesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
