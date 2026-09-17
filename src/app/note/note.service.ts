import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  NoteCreateParam,
  NoteItem,
  NoteListParam,
} from '../shared/models/note.model';
import { ListRes, DetailsRes } from '../shared/models/response.model';
import { environment } from '../../environments/environment';

const NOTES_ENDPOINT = `${environment.apiUrl}/notes`;

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly httpClient = inject(HttpClient);

  private readonly _notes = signal<NoteItem[]>([]);
  notes = this._notes.asReadonly();

  loadNotes(params: NoteListParam): Observable<ListRes<NoteItem>> {
    return this.httpClient
      .get<ListRes<NoteItem>>(NOTES_ENDPOINT, { params: { ...params } })
      .pipe(
        tap((response) => {
          console.log(response);
          this._notes.set(response.data);
        }),
      );
  }

  storeNote(params: NoteCreateParam): Observable<DetailsRes<string>> {
    return this.httpClient.post<DetailsRes<string>>(NOTES_ENDPOINT, params);
  }
}
