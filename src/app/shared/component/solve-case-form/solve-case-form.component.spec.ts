import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveCaseFormComponent } from './solve-case-form.component';

describe('SolveCaseFormComponent', () => {
  let component: SolveCaseFormComponent;
  let fixture: ComponentFixture<SolveCaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolveCaseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveCaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
