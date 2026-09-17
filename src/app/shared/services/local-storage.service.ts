import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly CURRENT_USER = 'user';

  setUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  getUser(): User | null {
    return JSON.parse(<string>localStorage.getItem(this.CURRENT_USER));
  }

  delUser() {
    localStorage.removeItem(this.CURRENT_USER);
  }
}
