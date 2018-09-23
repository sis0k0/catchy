import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchyNameComponent } from './catchy-name.component';

describe('CatchyNameComponent', () => {
  let component: CatchyNameComponent;
  let fixture: ComponentFixture<CatchyNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchyNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchyNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
