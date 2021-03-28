import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvEditComponent } from './rdv-edit.component';

describe('RdvEditComponent', () => {
  let component: RdvEditComponent;
  let fixture: ComponentFixture<RdvEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdvEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
