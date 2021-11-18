import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MurderWeaponListComponent } from './murder-weapon-list.component';

describe('MurderWeaponListComponent', () => {
  let component: MurderWeaponListComponent;
  let fixture: ComponentFixture<MurderWeaponListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MurderWeaponListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MurderWeaponListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
