import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
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
  cameraDetected: boolean = false;
  isDesktop: boolean = false;
  isTablet: boolean = false;
  isMobile: boolean = false;
  captureImageData: boolean = true;
  cameraWidth: number = 466;
  cameraHeight: number = 349;
  private trigger: Subject<void> = new Subject<void>();
  modalRef?: BsModalRef;
  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;

  @Output() fileOutput = new EventEmitter<File>();

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
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
  }

  checkForWebCame() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.cameraDetected = mediaDevices && mediaDevices.length > 0;
      });
  }

  handleMobileImage(event) {
    if (event.target.files.length > 0) {
      console.log('received Mobile image', event);
      const file = event.target.files[0];
      this.fileOutput.emit(file);
    }
  }

  handleDesktopImage(event): void {
    if (event.imageAsBase64) {
      console.log('received Desktop image', event);
      const file = this.convertWebCamImage(event);
      this.fileOutput.emit(file);
    } else if (event.target.files.length > 0) {
      console.log('received Desktop image', event);
      const file = event.target.files[0];
      this.fileOutput.emit(file);
    }
  }

  convertWebCamImage(webcamImage: WebcamImage) {
    const arr = webcamImage.imageAsDataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'upload', { type: mime });
  }

  triggerSnapshot(): void {
    this.trigger.next();
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
    if (this.isDesktopCameraAccess()) {
      this.modalRef = this.modalService.show(webCamTemplate, { backdrop: 'static' });
    }
  }

  isMobileOrTablet() {
    return this.isMobile || this.isTablet;
  }

  isDesktopCameraAccess() {
    return this.isDesktop && this.cameraDetected;
  }
}
