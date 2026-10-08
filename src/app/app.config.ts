import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { routes } from './app.routes';
import {
  provideAngularCLIVersion,
  provideAppName,
  provideAppVersion,
} from './app-json-data';
import { version, name, devDependencies } from '../../package.json';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAppName(name),
    provideAppVersion(version),
    provideAngularCLIVersion(devDependencies['@angular/cli']),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'd/M/yyyy' },
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 6000,
        horizontalPosition: 'end',
      },
    },
  ],
};
