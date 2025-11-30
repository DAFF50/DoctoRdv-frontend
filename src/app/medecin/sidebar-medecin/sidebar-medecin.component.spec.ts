import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMedecinComponent } from './sidebar-medecin.component';

describe('SidebarMedecinComponent', () => {
  let component: SidebarMedecinComponent;
  let fixture: ComponentFixture<SidebarMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
