import { Routes } from '@angular/router';
import { NoteComponent } from './note.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { NOTE_PATH_SEGMENTS } from '../shared/consts/paths';

export const noteRoutes: Routes = [
  {
    path: '',
    component: NoteComponent,
    title: 'Note',
  },
  {
    path: NOTE_PATH_SEGMENTS.CREATE_NOTE,
    component: CreateNoteComponent,
    title: 'Add new note',
  },
];
