import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SignupService } from 'src/app/shared/services/signup.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder, 
    private signUpService:SignupService,
    private router: Router
    ) {
    this.form = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: [() => this.comparePasswords()]
      // validators: [this.test.bind(this)]
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].errors && this.form.controls[controlName].errors![errorName];
  }

  comparePasswords() {
    if(!this.form) return null;

    const { password, confirm } = this.form.getRawValue();
    if (password === confirm) {
      return null;
    } else {
      return {
        match: true
      }
    }
  }

  validateDomain() {
    if(!this.form) return null;

    // const { email } = this.form.getRawValue();
    const email = this.form.controls['email'].value;

    const domain = email.split('@')[1];

    if(domain !== 'iteso.mx') {
      return {
        domain: { required: 'iteso.mx', current: domain }
      };
    }

    return null;

  }

  signup() {
    const url: string = `${environment.apiUrl}user`;
  
    this.signUpService.signUp({
      name: this.form.controls['name'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    }).subscribe({
      next: (response: User) => {
        this.router.navigate(['login'], { queryParams: { success: true } });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
}
