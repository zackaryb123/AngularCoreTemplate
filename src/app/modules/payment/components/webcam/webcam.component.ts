import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {DeviceDetectorService} from 'ngx-device-detector';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NgxImageCompressService} from 'ngx-image-compress';
import {CONSTANT} from '../../constant';
import {webCamURItoFile} from '../../utils';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class WebcamComponent implements OnInit {
  cameraWidth: number = 466;
  cameraHeight: number = 349;
  deviceInfo: any;
  imageQuality: number = 0.92;
  imageType: string = 'image/jpeg';
  cameraDetected: boolean = false;
  isDesktop: boolean = false;
  isTablet: boolean = false;
  isMobile: boolean = false;
  private trigger: Subject<void> = new Subject<void>();
  modalRef?: BsModalRef;

  @Output() fileOutput = new EventEmitter<File>();

  constructor(
    private deviceService: DeviceDetectorService,
    private modalService: BsModalService,
    private imageCompress: NgxImageCompressService
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
      console.log('received Mobile image as file', event);
      const file = event.target.files[0];
      if (file.size > CONSTANT.PAYMENT_CARD_IMAGE.MAX_FILE_SIZE) {
        this.readFileAsDataUriAndCompress(file);
      } else {
        this.fileOutput.emit(file);
      }
    }
  }

  handleDesktopImage(event): void {
    if (event.imageAsBase64) { // Check for webcam capture before we check upload from file system
      const webcamImage: WebcamImage = event;
      console.log('received Desktop image as uri', event);
      const file = webCamURItoFile(webcamImage);
      if (file.size > CONSTANT.PAYMENT_CARD_IMAGE.MAX_FILE_SIZE) {
        this.compressFile(webcamImage.imageAsBase64, 'webcam card capture');
      } else {
        this.fileOutput.emit(file);
      }
    } else if (event.target.files.length > 0) {
      console.log('received Desktop image as file', event);
      const file = event.target.files[0];
      if (file.size > CONSTANT.PAYMENT_CARD_IMAGE.MAX_FILE_SIZE) {
        this.readFileAsDataUriAndCompress(file);
      } else {
        this.fileOutput.emit(file);
      }
    }
  }

  readFileAsDataUriAndCompress(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const localUrl = e.target.result;
      this.compressFile(localUrl, file.name);
    };
    reader.readAsDataURL(file);
  }

  compressFile(image, fileName) {
    console.log('Size in bytes is now:', this.imageCompress.byteCount(image));
    const imageName = fileName;
    this.imageCompress.compressFile(
      image,
      CONSTANT.PAYMENT_CARD_IMAGE.ORIENTATION,
      CONSTANT.PAYMENT_CARD_IMAGE.COMPRESS_QUALITY,
      CONSTANT.PAYMENT_CARD_IMAGE.COMPRESS_RATIO
    ).then(result => {
      const compressedImageUri = result;
      console.log('Size in bytes after compression:', this.imageCompress.byteCount(compressedImageUri));
      const imageFile = new File([compressedImageUri], imageName, {type: CONSTANT.PAYMENT_CARD_IMAGE.TYPE});
      console.log('Compressed file : ' + imageFile);
      if (imageFile.size > CONSTANT.PAYMENT_CARD_IMAGE.MAX_FILE_SIZE) {
        this.compressFile(imageFile, imageFile.name);
      } else {
        this.fileOutput.emit(imageFile);
      }
    });
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
      this.modalRef = this.modalService.show(webCamTemplate, {backdrop: 'static'});
    }
  }

  isMobileOrTablet() {
    return this.isMobile || this.isTablet;
  }

  isDesktopCameraAccess() {
    return this.isDesktop && this.cameraDetected;
  }
}
