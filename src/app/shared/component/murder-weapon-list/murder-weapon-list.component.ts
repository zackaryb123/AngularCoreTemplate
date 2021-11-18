import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-murder-weapon-list',
  templateUrl: './murder-weapon-list.component.html',
  styleUrls: ['./murder-weapon-list.component.scss']
})
export class MurderWeaponListComponent implements OnInit {
  selectedWeapon: any;

  constructor() { }

  ngOnInit(): void {
  }

  selectWeapon(e) {
    console.log(e);
    this.selectedWeapon = e;
  }
}
