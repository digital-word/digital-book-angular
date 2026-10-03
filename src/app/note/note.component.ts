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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NoteListParam } from '../shared/models/note.model';
import { LoggerService } from '../shared/services/logger/logger.service';

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
    MatPaginatorModule,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  host: {
    class: 'flex flex-col gap-4 grow overflow-auto',
  },
})
export class NoteComponent implements OnInit {
  params = signal<NoteListParam>({
    page: 0,
    limit: 8,
  });

  private readonly noteService = inject(NoteService);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly logger = inject(LoggerService);
  readonly notes = this.noteService.notes;
  readonly paginationRes = this.noteService.paginationRes;
  readonly loading = signal(false);
  readonly error = signal(false);

  ngOnInit(): void {
    this.loading.set(true);
    this.error.set(false);

    this.logger.log(
      '[component] ngOnInit, paginationRes',
      this.paginationRes(),
    );
    this.logger.log('[component] ngOnInit, params', this.params());

    this.handleLoadPage(this.params().page).subscribe();
  }

  onChangePage(page: PageEvent) {
    this.logger.log('[component] onChangePage, page', page);
    this.loading.set(true);
    this.error.set(false);

    this.handleLoadPage(page.pageIndex).subscribe();
  }

  handleLoadPage(pageIndex: number) {
    this.logger.log('[component] handleLoadPage, pageIndex', pageIndex);

    this.params.update((curr) => ({ ...curr, page: pageIndex }));

    return this.noteService.loadPage(this.params()).pipe(
      catchError((err) => {
        this.error.set(true);
        this.handleSnackBar(
          `There has been an error \n ${err.error.message}`,
          'error',
        );

        return of();
      }),
      finalize(() => {
        this.loading.set(false);
      }),
    );
  }

  handleSnackBar(message: string, icon: string) {
    const snackData: SnackBarData = {
      message,
      icon,
      matSnackBar: this.matSnackBar,
    };

    this.matSnackBar.openFromComponent(SnackBarComponent, {
      data: snackData,
      panelClass: SnackBarPanelClass.ERROR,
    });
  }
}
