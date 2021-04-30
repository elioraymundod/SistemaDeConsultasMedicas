import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionExpedienteComponent } from './informacion-expediente.component';

describe('InformacionExpedienteComponent', () => {
  let component: InformacionExpedienteComponent;
  let fixture: ComponentFixture<InformacionExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionExpedienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
