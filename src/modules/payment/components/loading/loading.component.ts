import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {isNewChange} from '../../utils';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements OnInit, OnChanges  {
  @Input() showSpinner: boolean = false;

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (isNewChange(changes.showSpinner)) {
      if (changes.showSpinner.currentValue) {
        return this.spinner.show();
      } else {
        return this.spinner.hide();
      }
    }
  }

}
