import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipRacunaComponent } from './tip-racuna.component';

describe('TipRacunaComponent', () => {
  let component: TipRacunaComponent;
  let fixture: ComponentFixture<TipRacunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipRacunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipRacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
