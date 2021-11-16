import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitnessListComponent } from './witness-list.component';

describe('WitnessListComponent', () => {
  let component: WitnessListComponent;
  let fixture: ComponentFixture<WitnessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitnessListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WitnessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
