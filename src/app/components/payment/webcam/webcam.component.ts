import {Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {DeviceDetectorService} from 'ngx-device-detector';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class WebcamComponent implements OnInit {
  deviceInfo: any;
  showWebcam: boolean = false;
  imageQuality: number = 0.92;
  imageType: string = 'image/jpeg';
  captureImageData: boolean = true;
  cameraWidth: number = 466;
  cameraHeight: number = 349;
  private trigger: Subject<void> = new Subject<void>();
  webcamImage: WebcamImage = null;
  mobileImage: any;
  modalRef?: BsModalRef;

  constructor(
    private deviceService: DeviceDetectorService,
    private modalService: BsModalService
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

  displayWebcam(webCamTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(webCamTemplate, { backdrop: 'static' });
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
