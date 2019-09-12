import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoEditarComponent } from './turno-editar.component';

describe('TurnoEditarComponent', () => {
  let component: TurnoEditarComponent;
  let fixture: ComponentFixture<TurnoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
