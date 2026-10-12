import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { Router, RouterOutlet } from '@angular/router';

import {
  BreakpointService,
  BreakpointCategory,
} from '../shared/services/breakpoint.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { catchError, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SnackBarData,
  SnackBarPanelClass,
} from '../shared/models/snack-bar-data.model';
import { SnackBarComponent } from '../shared/components/snack-bar/snack-bar.component';
import { LoggerService } from '../shared/services/logger/logger.service';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    SideNavComponent,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  host: {
    class: 'block h-screen',
  },
})
export class LayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly logger = inject(LoggerService);

  readonly title = inject(Title);
  private readonly breakpointService = inject(BreakpointService);

  private readonly isBelowResponsiveBreakpoint =
    this.breakpointService.isBelowBreakpoint(BreakpointCategory.MEDIUM);

  sideNavMode = computed<MatDrawerMode>(() =>
    this.isBelowResponsiveBreakpoint() ? 'over' : 'side',
  );
  isSideNavOpen = computed(() => !this.isBelowResponsiveBreakpoint());

  hasBackground = computed(() => this.sideNavMode() === 'over');

  onLogout() {
    this.authService
      .logout()
      .pipe(
        tap(() => {
          void this.router.navigate(['/']);
        }),
        catchError((err) => {
          this.logger.error('[component] onLogout, error', err);

          const snackData: SnackBarData = {
            message: `There has been an error ${err.error.message}`,
            icon: 'error',
            matSnackBar: this.matSnackBar,
          };

          this.matSnackBar.openFromComponent(SnackBarComponent, {
            data: snackData,
            panelClass: SnackBarPanelClass.ERROR,
          });

          return of();
        }),
      )
      .subscribe();
  }
}
