import { Routes } from '@angular/router';
import { NoteComponent } from './note.component';
import { CreateNoteComponent } from './create-note/create-note.component';

export const noteRoutes: Routes = [
  {
    path: '',
    component: NoteComponent,
    title: 'Note',
  },
  {
    path: 'create-note',
    component: CreateNoteComponent,
    title: 'Add new note',
  },
];
