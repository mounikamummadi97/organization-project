import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataServiceComponent } from './user-data-service.component';

describe('UserDataServiceComponent', () => {
  let component: UserDataServiceComponent;
  let fixture: ComponentFixture<UserDataServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDataServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
