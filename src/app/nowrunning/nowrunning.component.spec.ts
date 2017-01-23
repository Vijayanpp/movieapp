/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NowrunningComponent } from './nowrunning.component';

describe('NowrunningComponent', () => {
  let component: NowrunningComponent;
  let fixture: ComponentFixture<NowrunningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowrunningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowrunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
