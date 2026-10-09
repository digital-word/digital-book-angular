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
import { NoteListParam, SortBy, SortOrder } from '../shared/models/note.model';
import { LoggerService } from '../shared/services/logger/logger.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-note',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    DatePipe,
    MatProgressSpinnerModule,
    MatSelectModule,
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
    sortOrder: SortOrder.DESC,
    sortBy: SortBy.CREATED_AT,
  });

  private readonly noteService = inject(NoteService);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly logger = inject(LoggerService);
  readonly orderBy = [
    {
      value: SortBy.CREATED_AT,
      label: 'Created At',
    },
    {
      value: SortBy.TITLE,
      label: 'Title',
    },
    {
      value: SortBy.UPDATED_AT,
      label: 'Updated At',
    },
  ];

  readonly sortOrder = [
    {
      value: SortOrder.DESC,
      label: 'Desc',
    },
    {
      value: SortOrder.ASC,
      label: 'Asc',
    },
  ];

  readonly notes = this.noteService.notes;
  readonly paginationRes = this.noteService.paginationRes;
  readonly loading = signal(false);
  readonly error = signal(false);

  ngOnInit(): void {
    this.logger.log(
      '[component] ngOnInit, paginationRes',
      this.paginationRes(),
    );
    this.logger.log('[component] ngOnInit, params', this.params());

    this.handleLoadPage(this.params().page).subscribe();
  }

  onChangePage(page: PageEvent) {
    this.logger.log('[component] onChangePage, page', page);
    this.handleLoadPage(page.pageIndex).subscribe();
  }

  handleLoadPage(pageIndex: number) {
    this.loading.set(true);
    this.error.set(false);

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

  onSortByChange(event: MatSelectChange<SortBy>) {
    this.logger.log('[component] onSortByChange, event.value', event.value);
    this.params.update((curr) => ({ ...curr, sortBy: event.value }));
    this.handleLoadPage(this.params().page).subscribe();
  }

  onSortOrderChange(event: MatSelectChange<SortOrder>) {
    this.logger.log('[component] onSortOrderChange, event.value', event.value);
    this.params.update((curr) => ({ ...curr, sortOrder: event.value }));
    this.handleLoadPage(this.params().page).subscribe();
  }
}
