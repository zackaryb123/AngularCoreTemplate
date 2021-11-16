import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-victim-card',
  templateUrl: './victim-card.component.html',
  styleUrls: ['./victim-card.component.scss']
})
export class VictimCardComponent implements OnInit {
  @Input() victim;

  constructor() { }

  ngOnInit(): void {
  }

}
