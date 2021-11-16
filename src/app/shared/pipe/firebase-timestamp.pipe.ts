import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';
import {FirebaseTimeStamp} from '../interface/firebase.interface';

@Pipe({
  name: 'firebaseTimestamp'
})
export class FirebaseTimestampPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(value: FirebaseTimeStamp, ...args: unknown[]): unknown {
    return this.datePipe.transform((1000 * value.seconds));
  }

}
