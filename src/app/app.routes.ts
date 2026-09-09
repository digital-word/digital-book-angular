import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { noteRoutes } from './note/note.routes';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    title: 'Dashboard',
  },
  {
    path: 'project-details',
    component: ProjectDetailsComponent,
    title: 'Project Details',
  },
  {
    path: 'note',
    children: noteRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
