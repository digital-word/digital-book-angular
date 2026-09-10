import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, map, of, tap } from 'rxjs';
import { NoteService } from '../note.service';
import { NotePermission, NoteStatus } from '../../shared/models/note.model';
import { SnackBarComponent } from '../../shared/components/snack-bar/snack-bar.component';
import {
  SnackBarData,
  SnackBarPanelClass,
} from '../../shared/models/snack-bar-data.model';

@Component({
  selector: 'app-create-note',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block h-full',
    '(submit)': 'onSubmit()',
  },
})
export class CreateNoteComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly noteService = inject(NoteService);
  private readonly router = inject(Router);
  private readonly matSnackBar = inject(MatSnackBar);

  readonly statuses = Object.values(NoteStatus);
  readonly permissions = Object.values(NotePermission);

  readonly loading = signal(false);
  readonly error = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    isFavorite: [false],
    status: [NoteStatus.DRAFT, Validators.required],
    permissions: [NotePermission.PRIVATE, Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);
    this.error.set(false);

    this.noteService
      .storeNote(this.form.getRawValue())
      .pipe(
        tap((res) => {
          if (res.success) {
            this.router.navigate(['/note']);
          }
        }),
        catchError((err) => {
          this.error.set(true);
          const snackData: SnackBarData = {
            message: `There has been an error \n ${err.error.message}`,
            icon: 'error',
            matSnackBar: this.matSnackBar,
          };

          this.matSnackBar.openFromComponent(SnackBarComponent, {
            data: snackData,
            panelClass: SnackBarPanelClass.ERROR,
          });

          return of(null);
        }),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe();
  }
}
