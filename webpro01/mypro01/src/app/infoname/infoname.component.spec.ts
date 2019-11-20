import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfonameComponent } from './infoname.component';

describe('InfonameComponent', () => {
  let component: InfonameComponent;
  let fixture: ComponentFixture<InfonameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfonameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfonameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
