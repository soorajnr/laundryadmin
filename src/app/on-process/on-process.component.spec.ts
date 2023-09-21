import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnprocessComponent } from './on-process.component';


describe('OnprocessComponent', () => {
  let component: OnprocessComponent;
  let fixture: ComponentFixture<OnprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnprocessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
