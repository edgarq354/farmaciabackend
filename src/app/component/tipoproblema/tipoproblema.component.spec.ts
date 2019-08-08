import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoproblemaComponent } from './tipoproblema.component';

describe('TipoproblemaComponent', () => {
  let component: TipoproblemaComponent;
  let fixture: ComponentFixture<TipoproblemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoproblemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoproblemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
