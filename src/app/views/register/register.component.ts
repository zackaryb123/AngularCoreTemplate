import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {AppConstants} from '../../constants';
import {PayaQboService} from '../../service/paya-qbo.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  boardForm: FormGroup;
  authToken: string = null;
  alertsDismiss: any = [];

  constructor(
    private _payaQboService: PayaQboService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.createBoardForm();
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe( paramMap => {
      this.authToken = paramMap.get('info');
    });
    }

  boardUser(formValues) {
    formValues.info = this.authToken;
    console.log('formValues', formValues);
    this._payaQboService.boardUser(formValues)
      .then(res => {
        console.log(res);
        if (res) {
          this.document.location.href = AppConstants.PAYA_REDIRECT;
        }
      }).catch(res => this.alert('danger', res.error.message));
  }

  createBoardForm() {
    this.boardForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      domain: ['', Validators.required]
    });
  }

  alert(type, msg): void { // info, success, danger, warning
    this.alertsDismiss.push({
      type: type,
      msg: msg,
      timeout: 5000
    });
  }
}
