import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormupComponent } from './formup.component';

describe('FormupComponent', () => {
  let component: FormupComponent;
  let fixture: ComponentFixture<FormupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
