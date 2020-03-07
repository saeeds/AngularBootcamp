import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompainesComponent } from './compaines.component';

describe('CompainesComponent', () => {
  let component: CompainesComponent;
  let fixture: ComponentFixture<CompainesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompainesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompainesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
