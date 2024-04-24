import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerNavComponent } from './inner-nav.component';

describe('InnerNavComponent', () => {
  let component: InnerNavComponent;
  let fixture: ComponentFixture<InnerNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
