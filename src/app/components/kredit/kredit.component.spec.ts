import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KreditComponent } from './kredit.component';

describe('KreditComponent', () => {
  let component: KreditComponent;
  let fixture: ComponentFixture<KreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
