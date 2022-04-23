import {Component, HostListener, OnInit} from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {
  deviceInfo: any;
  showWebcam: boolean = false;
  imageQuality: number = 0.92;
  imageType: string = 'image/jpeg';
  captureImageData: boolean = true;
  cameraWidth: number = 0;
  cameraHeight: number = 0;
  private trigger: Subject<void> = new Subject<void>();
  webcamImage: WebcamImage = null;
  mobileImage: any;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.cameraWidth = win.innerWidth;
    this.cameraHeight = win.innerHeight;
  }

  constructor(
    private deviceService: DeviceDetectorService
  ) {
    this.deviceDetection();
    this.checkForWebCame();
  }

  ngOnInit(): void { }

  deviceDetection() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.deviceInfo.isMobile = this.deviceService.isMobile();
    this.deviceInfo.isTablet = this.deviceService.isTablet();
    this.deviceInfo.isDesktop = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
  }

  checkForWebCame() {
    this.cameraWidth = window.innerWidth;
    this.cameraHeight = window.innerHeight;
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.deviceInfo.cameraDetected = mediaDevices && mediaDevices.length > 0;
      });
  }

  previewFile(input) {
    console.log('Input', input);
    console.log('Mobile Image', this.mobileImage);
     // const file = $("input[type=file]").get(0).files[0];
     // if (file) {
     //   const reader = new FileReader();
     // reader.onload = function() {
     //   $("#previewImg").attr("src", reader.result);
     // }
     // reader.readAsDataURL(file);
     // }
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

  displayWebcam() {
    if (this.isDesktopCameraAccess()) {
      this.showWebcam = true;
    }
  }

  isMobileOrTablet() {
    return this.deviceInfo.isMobile || this.deviceInfo.isTablet;
  }

  isDesktop() {
    return this.deviceInfo.isDesktop;
  }

  isDesktopCameraAccess() {
    return this.deviceInfo.isDesktop || this.deviceInfo.cameraDetected;
  }
}
