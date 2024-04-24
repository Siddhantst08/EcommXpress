import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterhomeComponent } from './outerhome.component';

describe('OuterhomeComponent', () => {
  let component: OuterhomeComponent;
  let fixture: ComponentFixture<OuterhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuterhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuterhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
