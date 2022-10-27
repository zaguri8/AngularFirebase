import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    public authService: AuthService,
    private router: Router) {

    authService.user$.subscribe((user) => {
      if (user !== null) {
        this.router.navigate(['home'])
      }
    })
  }

  onSubmitSignup() {
    const email = this.signUpForm.value.email!!
    const password = this.signUpForm.value.password!!

    this.authService.signUp(email, password)
  }

  onSubmitSignin() {
    const email = this.signInForm.value.email!!
    const password = this.signInForm.value.password!!

    this.authService.signIn(email, password)
  }

  ngOnInit(): void {

  }

}
