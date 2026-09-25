import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { SideNavComponent } from './side-nav.component';
import { TITLE } from '../app.const';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavComponent, MatIconTestingModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const titleElement = fixture.nativeElement.querySelector(
      'header h1',
    ) as HTMLHeadingElement;

    expect(component.projectTitle).toBe(TITLE);
    expect(titleElement.textContent?.trim()).toBe(TITLE);
  });
});
