import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarArticuloComponent } from './actualizar-articulo.component';

describe('ActualizarArticuloComponent', () => {
  let component: ActualizarArticuloComponent;
  let fixture: ComponentFixture<ActualizarArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
