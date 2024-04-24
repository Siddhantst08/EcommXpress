import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerNavUserComponent } from './inner-nav-user.component';

describe('InnerNavUserComponent', () => {
  let component: InnerNavUserComponent;
  let fixture: ComponentFixture<InnerNavUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerNavUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerNavUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
