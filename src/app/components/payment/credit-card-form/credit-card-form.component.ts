import { Component, OnInit } from '@angular/core';
import {BsDatepickerViewMode} from 'ngx-bootstrap/datepicker';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeviceDetectorService} from 'ngx-device-detector';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent implements OnInit {
  // Payment Form variables
  minMode: BsDatepickerViewMode = 'month';
  datePicker: Date;
  creditCardForm: FormGroup;
  deviceInfo: any;
  // Web Camera variables
  showWebcam: boolean = true;
  imageQuality: number = 0.92;
  imageType: string = 'image/jpeg';
  captureImageData: boolean = true;
  private trigger: Subject<void> = new Subject<void>();
  public webcamImage: WebcamImage = null;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private deviceService: DeviceDetectorService
  ) {
    this.checkForWebCame();
    this.buildCreditCardForm();
    this.deviceDetection();
  }

  ngOnInit(): void {
  }

  buildCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.minLength(10)], Validators.pattern('')],
      cardHolderName: ['', [Validators.required, Validators.minLength(10)]],
      expDate: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      zipCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
    });
  }

  deviceDetection() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.deviceInfo.isMobile = this.deviceService.isMobile();
    this.deviceInfo.isTablet = this.deviceService.isTablet();
    this.deviceInfo.isDesktop = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
  }

  setDate() {
    const expDate = this.datePipe.transform(this.datePicker.getTime(), 'MM-yyyy');
    this.creditCardForm.controls['expDate'].setValue(expDate);
    console.log(this.creditCardForm.controls);
  }

  checkForWebCame() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.showWebcam = mediaDevices && mediaDevices.length > 0;
      });
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  handleWebCamInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      console.warn('Camera access was not allowed by user!');
    }
  }
}
