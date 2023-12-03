import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/shared/interfaces/token';
import { User } from 'src/app/shared/interfaces/user';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: User = { name: '', email: '', lastName: '' };

  loginStatus:boolean = false

  constructor(
    private tokenService: TokenService, 
    private routerService: Router,
    private socialAuth: SocialAuthService,
    private loginService: LoginService
  ){

    this.tokenService.loginStatus.subscribe((status:boolean)=>{
      this.loginStatus = status;
    })

    this.socialAuth.authState.subscribe((user:SocialUser) => {
      if(user){
        this.loginService.googleLogin(user.idToken).subscribe({
          next: (response: Token) => {
            this.tokenService.save(response.token);
            this.routerService.navigate([''])
          },
          error: (err) => {
            alert('No se pudo iniciar sesion')
            //console.log(err);
            
          }
        });
      }
    })
    
  }


  logout(){
    this.tokenService.remove();
    //console.log("Si se deslogueo");
    this.loginStatus = false;
    this.routerService.navigate(['login']);
  }
}
