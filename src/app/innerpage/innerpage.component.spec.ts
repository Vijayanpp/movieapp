/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InnerpageComponent } from './innerpage.component';

describe('InnerpageComponent', () => {
  let component: InnerpageComponent;
  let fixture: ComponentFixture<InnerpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
