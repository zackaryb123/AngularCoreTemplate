import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../core/auth/firebase/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _authService: FirebaseService
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  goToLogin() {
    return this.router.navigate(['/login']);
  }

  tryRegister(value) {
    this._authService.doRegister(value)
      .then(res => {
        console.log(res);
        return this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      });
  }

}
