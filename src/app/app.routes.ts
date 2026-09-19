import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { noteRoutes } from './note/note.routes';
import { authRoutes } from './auth/auth.routes';
import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './auth/auth.guard';
import { PATH_SEGMENTS } from './shared/consts/paths';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'secure',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: PATH_SEGMENTS.DASHBOARD,
        pathMatch: 'full',
      },
      {
        path: PATH_SEGMENTS.DASHBOARD,
        component: DashboardComponent,
        pathMatch: 'full',
        title: 'Dashboard',
      },
      {
        path: PATH_SEGMENTS.PROJECT_DETAILS,
        component: ProjectDetailsComponent,
        title: 'Project Details',
      },
      {
        path: PATH_SEGMENTS.NOTE,
        children: noteRoutes,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: authRoutes,
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
