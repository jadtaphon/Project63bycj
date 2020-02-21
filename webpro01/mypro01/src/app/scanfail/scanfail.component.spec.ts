import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanfailComponent } from './scanfail.component';

describe('ScanfailComponent', () => {
  let component: ScanfailComponent;
  let fixture: ComponentFixture<ScanfailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanfailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanfailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
