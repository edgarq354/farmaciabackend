import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaciaPerfilComponent } from './farmacia-perfil.component';

describe('FarmaciaPerfilComponent', () => {
  let component: FarmaciaPerfilComponent;
  let fixture: ComponentFixture<FarmaciaPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmaciaPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmaciaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
