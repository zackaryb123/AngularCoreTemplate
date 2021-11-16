import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solve-case-form',
  templateUrl: './solve-case-form.component.html',
  styleUrls: ['./solve-case-form.component.scss']
})
export class SolveCaseFormComponent implements OnInit {
  selectedSuspect: any;

  constructor() { }

  ngOnInit(): void {
  }

  selectSuspect(e) {
    console.log(e);
    this.selectedSuspect = e;
  }
  solve() {
    console.log(this.selectedSuspect);
  }
}
