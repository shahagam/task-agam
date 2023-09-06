import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatStatusComponent } from './pat-status.component';

describe('PatStatusComponent', () => {
  let component: PatStatusComponent;
  let fixture: ComponentFixture<PatStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
