import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
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

  user: User = { name: '', email: '', lastName: '', roles: [] };
  loginStatus:boolean = false
  role: string = ""

  constructor(
    private tokenService: TokenService, 
    private routerService: Router,
    private socialAuth: SocialAuthService,
    private loginService: LoginService
  ){

    //console.log("En el constructor");
    

    this.tokenService.loginStatus.subscribe((status:boolean)=>{
      console.log("Status", status);
      this.loginStatus = status;
    })

    this.loginService.role.subscribe((role:string)=>{
      console.log("Role", role);
      this.role = role;
    })
    
    this.socialAuth.authState.subscribe((user:SocialUser) => {
      if(user){
        this.loginService.googleLogin(user.idToken).subscribe({
          next: (response: Token) => {
            this.tokenService.save(response.token);
            this.loginService.getAdmin(response.token).subscribe({
              next: (response) => {
                if(response.status){
                  this.loginService.saveRole('admin')
                }
              },
              error: (err) => {
                console.log(err);
              }
            });
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
    this.loginService.removeRole();
    //console.log("Si se deslogueo");
    this.loginStatus = false;
    this.routerService.navigate(['login']);
  }
}
