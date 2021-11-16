import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseArticleComponent } from './case-article.component';

describe('CaseArticleComponent', () => {
  let component: CaseArticleComponent;
  let fixture: ComponentFixture<CaseArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
