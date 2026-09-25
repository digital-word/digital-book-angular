import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsComponent } from './project-details.component';
import { environment } from '../../environments/environment';
import {
  provideAngularCLIVersion,
  provideAppName,
  provideAppVersion,
} from '../app-json-data';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsComponent],
      providers: [
        provideAppName('digital-book-angular'),
        provideAppVersion('0.0.1'),
        provideAngularCLIVersion('^21.2.7'),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize app info values from environment', () => {
    expect(component.apiURL).toBe(environment.apiUrl);
    expect(component.env).toBe(environment.env);
  });
});
