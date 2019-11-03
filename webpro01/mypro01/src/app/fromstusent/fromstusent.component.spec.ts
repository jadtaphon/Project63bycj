import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromstusentComponent } from './fromstusent.component';

describe('FromstusentComponent', () => {
  let component: FromstusentComponent;
  let fixture: ComponentFixture<FromstusentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromstusentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromstusentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
