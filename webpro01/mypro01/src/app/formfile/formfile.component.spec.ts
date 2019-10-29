import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfileComponent } from './formfile.component';

describe('FormfileComponent', () => {
  let component: FormfileComponent;
  let fixture: ComponentFixture<FormfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
