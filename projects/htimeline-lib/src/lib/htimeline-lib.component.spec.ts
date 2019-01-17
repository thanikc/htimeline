import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtimelineLibComponent } from './htimeline-lib.component';

describe('HtimelineLibComponent', () => {
  let component: HtimelineLibComponent;
  let fixture: ComponentFixture<HtimelineLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtimelineLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtimelineLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
