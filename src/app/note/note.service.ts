import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  NoteCreateParam,
  NoteCreateRes,
  NoteItem,
  NoteListParam,
  NoteRes,
} from '../shared/models/note.model';
import { environment } from '../../environments/environment';

const API_ENDPOINT = `${environment.apiUrl}/notes`;

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly httpClient = inject(HttpClient);

  private readonly _notes = signal<NoteItem[]>([]);
  notes = this._notes.asReadonly();

  loadNotes(params: NoteListParam): Observable<NoteRes> {
    return this.httpClient
      .get<NoteRes>(API_ENDPOINT, { params: { ...params } })
      .pipe(
        tap((response) => {
          console.log(response);
          this._notes.set(response.data);
        }),
      );
  }

  storeNote(params: NoteCreateParam): Observable<NoteCreateRes> {
    return this.httpClient.post<NoteCreateRes>(API_ENDPOINT, params);
  }
}
