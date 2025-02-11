import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitsDetailComponent } from './circuits-detail.component';

describe('CircuitsDetailComponent', () => {
  let component: CircuitsDetailComponent;
  let fixture: ComponentFixture<CircuitsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircuitsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircuitsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
