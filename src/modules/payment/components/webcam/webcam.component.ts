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
  @Output() loading = new EventEmitter<boolean>();

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
    this.loading.emit(true);
    if (event.target.files.length > 0) {
      console.log('received Mobile image as file', event);
      const file = event.target.files[0];
      if (file.size > CONSTANT.PAYMENT_CARD_IMAGE.MAX_FILE_SIZE) {
        this.readFileAsDataUriAndCompress(file);
      } else {
        this.loading.emit(false);
        this.fileOutput.emit(file);
      }
    }
  }

  handleDesktopImage(event): void {
    this.loading.emit(true);
    if (event.imageAsBase64) { // Check for webcam capture before we check upload from file system
      const webcamImage: WebcamImage = event;
      console.log('received Desktop image as uri', event);
      const file = webCamURItoFile(webcamImage.imageAsDataUrl, 'webcam card capture');
      if (file.size > CONSTANT.PAYMENT_CARD_IMAGE.MAX_FILE_SIZE) {
        this.imageCompress.getOrientation(event.imageAsBase64).then(orientation => {
          console.log('orientation : ', orientation);
          this.compressFile(webcamImage.imageAsBase64, 'webcam card capture', orientation);
        });
      } else {
        this.loading.emit(false);
        this.fileOutput.emit(file);
      }
    } else if (event.target.files.length > 0) {
      console.log('received Desktop image as file', event);
      const file = event.target.files[0];
      if (file.size > CONSTANT.PAYMENT_CARD_IMAGE.MAX_FILE_SIZE) {
        this.readFileAsDataUriAndCompress(file);
      } else {
        this.loading.emit(false);
        this.fileOutput.emit(file);
      }
    }
  }

  readFileAsDataUriAndCompress(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const localUrl = e.target.result;
      this.imageCompress.getOrientation(localUrl).then(orientation => {
        console.log('orientation : ', orientation);
        this.compressFile(localUrl, file.name, orientation);
      });
    };
    reader.readAsDataURL(file);
  }

  compressFile(image, fileName, orientation?) {
    console.log('Size in bytes is now:', this.imageCompress.byteCount(image));
    orientation = orientation ? orientation : CONSTANT.PAYMENT_CARD_IMAGE.ORIENTATION;
    const imageFileName = fileName;
    this.imageCompress.compressFile(
      image,
      orientation,
      CONSTANT.PAYMENT_CARD_IMAGE.COMPRESS_QUALITY,
      CONSTANT.PAYMENT_CARD_IMAGE.COMPRESS_RATIO
    ).then(result => {
      const compressedImageUri = result;
      console.log('Size in bytes after compression:', this.imageCompress.byteCount(compressedImageUri));
      const imageFile = webCamURItoFile(compressedImageUri, imageFileName);
      console.log('Compressed file : ' + imageFile);
      if (imageFile.size > CONSTANT.PAYMENT_CARD_IMAGE.MAX_FILE_SIZE) {
        this.compressFile(result, imageFile.name, orientation);
      } else {
        this.loading.emit(false);
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

  scanCard = function() {
    const cardIOResponseFields = [
      'card_type',
      'redacted_card_number',
      'card_number',
      'expiry_month',
      'expiry_year',
      'cvv',
      'zip'
    ];

    const onCardIOComplete = function(response) {
      for (let i = 0, len = cardIOResponseFields.length; i < len; i++) {
        const field = cardIOResponseFields[i];
        console.log(field + ': ' + response[field]);
      }
    };

    const onCardIOCancel = function() {
      console.log('card.io scan cancelled');
    };

    const onCardIOCheck = function (canScan) {
      console.log('card.io canScan? ' + canScan);
      const scanBtn = this.scanBtn.scope();
      // var scanBtn = document.getElementById("scanBtn");
      if (!canScan) {
        scanBtn.innerHTML = 'Manual entry';
      }
    };

    // CardIO.scan({
    //     'collect_expiry': true,
    //     'collect_cvv': false,
    //     'collect_zip': false,
    //     'shows_first_use_alert': true,
    //     'disable_manual_entry_buttons': false
    //   },
    //   onCardIOComplete,
    //   onCardIOCancel
    // );

    // CardIO.canScan(onCardIOCheck);
  };

}
