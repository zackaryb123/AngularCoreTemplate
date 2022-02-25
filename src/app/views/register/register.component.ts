import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {AppConstants} from '../../constants';
import {PayaQboService} from '../../service/paya-qbo.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  boardForm: FormGroup;

  constructor(
    private _payaQboService: PayaQboService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.createBoardForm();
  }

  boardUser(formValues) {
    console.log('formValues', formValues);
    this._payaQboService.boardUser(formValues)
      .then(res => {
        console.log(res);
        if (res) {
          this.document.location.href = AppConstants.PAYA_REDIRECT;
        }
      }).catch(err => console.log(err));
  }

  createBoardForm() {
    this.boardForm = this._formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required],
      domain: ['', Validators.required]
    });
  }
}
