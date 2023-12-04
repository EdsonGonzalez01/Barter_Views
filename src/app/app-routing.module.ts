import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './shared/guards/auth.guard';
import { unauthGuard } from './shared/guards/unauth.guard';
import { BartersComponent } from './pages/barters/barters.component';
import { BartersListComponent } from './pages/barters/barters-list/barters-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BartersCreateComponent } from './pages/barters/barters-create/barters-create.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent, canActivate: [unauthGuard]},
  { path: 'barters', component: BartersComponent,canActivate: [authGuard], children: [
    { path: '', component: BartersListComponent }, 
    { path: 'create', component: BartersCreateComponent }, 
  ] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard], children: [
    { path: '', component: UsersListComponent }, 
  ] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [unauthGuard]},
  { path: 'chat', component: ChatComponent, canActivate: [authGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
