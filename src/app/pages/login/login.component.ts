import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from 'src/app/shared/services/token.service';
import { Token } from 'src/app/shared/interfaces/token';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  hide = true;
  constructor(
    formBuilder: FormBuilder, 
    private tokenService: TokenService, 
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Check for success query parameter
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['success']) {
        const message = 'Signup successful! You can now log in.';
        this.showSuccessSnackbar(message);
      }
    });
  }

  private showSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'], // Add your custom style class
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].errors && this.form.controls[controlName].errors![errorName];
  }


  onSubmit() {
    const url: string = `${environment.apiUrl}login`;
    this.loginService.login({
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value
    }).subscribe({
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
        this.router.navigate([''])
      },
      error: (err) => {
        alert('An error ocurred, please try again later')
        //console.log(err);
      }
    })
  }
}
