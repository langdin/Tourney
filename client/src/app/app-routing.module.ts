import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { MyTourneysComponent } from './pages/my-tourneys/my-tourneys.component';
import { AuthGuard } from './guards/auth.guard';
import { ManageTourneyComponent } from './pages/my-tourneys/manage-tourney/manage-tourney.component';
import { ManageBoutComponent } from './pages/bout/manage-bout/manage-bout.component';
import { PlayerDetailsComponent } from './pages/player/player-details/player-details.component';
import { AboutComponent } from './pages/about/about.component';
import { AllTourneysComponent } from './pages/all-tourneys/all-tourneys.component';
import { ViewTourneyComponent } from './pages/view-tourney/view-tourney.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MailSentComponent } from './pages/contact/mail-sent/mail-sent.component';
import { MyinfoComponent } from './pages/auth/myinfo/myinfo.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'all_tourneys', component: AllTourneysComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'my-info', component: MyinfoComponent},

  {path: 'mail_sent', component: MailSentComponent},

  {path: 'view_tourney/:id', component: ViewTourneyComponent},

  {path: 'my_tourneys', component: MyTourneysComponent, canActivate: [AuthGuard]},

  {path: 'manage_tourney/:id', component: ManageTourneyComponent, canActivate: [AuthGuard]},

  {path: 'manage_bout/:id', component: ManageBoutComponent, canActivate: [AuthGuard]},

  {path: 'players/add/:boutid', component: PlayerDetailsComponent, data: {title: 'Add Participant'}, canActivate: [AuthGuard]},
  {path: 'players/edit/:boutid/:playerid', component: PlayerDetailsComponent, data: {title: 'Edit Participant'}, canActivate: [AuthGuard]},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
