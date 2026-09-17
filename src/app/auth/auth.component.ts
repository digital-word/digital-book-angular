import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  host: {
    class: 'flex items-center justify-center h-screen bg-sky-400',
  },
})
export class AuthComponent {}
