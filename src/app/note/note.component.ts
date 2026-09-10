import { Component, inject, OnInit, signal } from '@angular/core';
import { NoteService } from './note.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/components/snack-bar/snack-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  SnackBarData,
  SnackBarPanelClass,
} from '../shared/models/snack-bar-data.model';
import { catchError, finalize, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    DatePipe,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  host: {
    class: 'flex flex-col gap-4 grow overflow-auto',
  },
})
export class NoteComponent implements OnInit {
  private readonly noteService = inject(NoteService);
  readonly notes = this.noteService.notes;
  readonly loading = signal(false);
  readonly error = signal(false);

  constructor(private readonly matSnackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.noteService
      .loadNotes({
        page: 1,
        limit: 10,
      })
      .pipe(
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

          return of();
        }),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe();
  }
}
