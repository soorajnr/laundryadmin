import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDialogComponentComponent } from './detail-dialog-component.component';

describe('DetailDialogComponentComponent', () => {
  let component: DetailDialogComponentComponent;
  let fixture: ComponentFixture<DetailDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
