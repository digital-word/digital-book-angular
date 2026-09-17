import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/components/snack-bar/snack-bar.component';
import {
  SnackBarData,
  SnackBarPanelClass,
} from '../../shared/models/snack-bar-data.model';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  imports: [
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col items-center justify-center bg-white py-6 px-10',
  },
})
export class LoginComponent implements OnInit {
  readonly EMAIL_CONTROL = 'email';
  readonly PASSWORD_CONTROL = 'password';
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly localStorageService = inject(LocalStorageService);

  readonly loading = signal(false);

  ngOnInit(): void {
    if (this.localStorageService.getUser()) {
      this.router.navigate(['/secure']);
    }
  }

  loginForm = new FormGroup({
    [this.EMAIL_CONTROL]: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    [this.PASSWORD_CONTROL]: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    this.loading.set(true);
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService
        .login({ email, password })
        .pipe(
          tap((res) => {
            if (res.success) {
              this.localStorageService.setUser(res.data);
              this.router.navigate(['/secure/dashboard']);
            }
          }),
          catchError((err) => {
            const snackData: SnackBarData = {
              message: `There has been an error \n ${err.error.message}`,
              icon: 'error',
              matSnackBar: this.matSnackBar,
            };

            this.matSnackBar.openFromComponent(SnackBarComponent, {
              data: snackData,
              panelClass: SnackBarPanelClass.ERROR,
            });

            return of();
          }),
          finalize(() => {
            this.loading.set(false);
          }),
        )
        .subscribe();
    }
  }
}
