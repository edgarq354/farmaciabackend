import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaciaTurnoComponent } from './farmacia-turno.component';

describe('FarmaciaTurnoComponent', () => {
  let component: FarmaciaTurnoComponent;
  let fixture: ComponentFixture<FarmaciaTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmaciaTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmaciaTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
