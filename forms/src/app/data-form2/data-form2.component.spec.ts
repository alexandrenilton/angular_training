import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataForm2Component } from './data-form2.component';

describe('DataForm2Component', () => {
  let component: DataForm2Component;
  let fixture: ComponentFixture<DataForm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataForm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
