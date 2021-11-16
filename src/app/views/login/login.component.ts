import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../core/auth/firebase/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: FirebaseService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  goToRegister() {
    return this.router.navigate(['/register']);
  }

  tryLogin(value) {
    this._authService.doLogin(value).then(res => {
      console.log(res);
      }, err => {
      console.log(err);
      });
  }
}
