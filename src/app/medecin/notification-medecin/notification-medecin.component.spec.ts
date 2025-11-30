import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMedecinComponent } from './notification-medecin.component';

describe('NotificationMedecinComponent', () => {
  let component: NotificationMedecinComponent;
  let fixture: ComponentFixture<NotificationMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
