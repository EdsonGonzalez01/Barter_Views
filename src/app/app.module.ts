import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider} from '@abacritt/angularx-social-login';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { environment } from 'src/environments/environment';
import { LoginStatusDirective } from './shared/directives/login-status.directive';
import { BartersComponent } from './pages/barters/barters.component';
import { BartersListComponent } from './pages/barters/barters-list/barters-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BartersCreateComponent } from './pages/barters/barters-create/barters-create.component';
import { BarterDetailsComponent } from './pages/barters/barter-details/barter-details.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ChatComponent } from './chat/chat.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ShowInterestComponent } from './pages/barters/show-interest/show-interest.component';
import { ShowOffersComponent } from './pages/barters/show-offers/show-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    LoginStatusDirective,
    BartersComponent,
    BartersListComponent,
    ProfileComponent,
    ChatComponent,
    BartersCreateComponent,
    BarterDetailsComponent,
    UsersComponent,
    UsersListComponent,
    FooterComponent,
    ShowInterestComponent,
    ShowOffersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClient
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
