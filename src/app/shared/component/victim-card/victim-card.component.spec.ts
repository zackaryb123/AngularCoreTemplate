import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictimCardComponent } from './victim-card.component';

describe('VictimCardComponent', () => {
  let component: VictimCardComponent;
  let fixture: ComponentFixture<VictimCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VictimCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VictimCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
