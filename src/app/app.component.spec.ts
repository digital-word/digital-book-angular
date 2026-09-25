/// <reference types="jasmine" />

import { signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { BreakpointService } from './shared/services/breakpoint.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        ...appConfig.providers,
        // Isolates the test from the real browser viewport, which the sidenav's mode/opened state now depends on.
        {
          provide: BreakpointService,
          useValue: { isBelowBreakpoint: () => signal(false) },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
