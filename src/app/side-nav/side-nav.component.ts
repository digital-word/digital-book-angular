import { Component } from '@angular/core';
import { TITLE as PROJECT_TITLE } from '../app.const';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  PATH_DASHBOARD,
  PATH_NOTE,
  PATH_PROJECT_DETAILS,
} from '../shared/consts/paths';

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  host: {
    class: 'flex h-full',
  },
})
export class SideNavComponent {
  projectTitle = PROJECT_TITLE;
  paths = {
    dashboard: `/${PATH_DASHBOARD}`,
    projectDetails: `/${PATH_PROJECT_DETAILS}`,
    note: `/${PATH_NOTE}`,
  };
}
