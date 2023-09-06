import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatAddEditComponent } from './pat-add-edit.component';

describe('PatAddEditComponent', () => {
  let component: PatAddEditComponent;
  let fixture: ComponentFixture<PatAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
