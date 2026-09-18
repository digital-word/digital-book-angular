import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface CustomIconSVG {
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  iconSvgList: CustomIconSVG[] = [
    {
      name: 'dashboard',
      path: 'icon/dashboard.svg',
    },
    {
      name: 'details',
      path: 'icon/details.svg',
    },
    {
      name: 'notes',
      path: 'icon/notes.svg',
    },
    {
      name: 'logo',
      path: 'icon/logo.svg',
    },
    {
      name: 'logo-current-color',
      path: 'icon/logo-current-color.svg',
    },
    {
      name: 'error',
      path: 'icon/error.svg',
    },
    {
      name: 'logout',
      path: 'icon/logout.svg',
    },
  ];

  registerIconList() {
    for (const icon of this.iconSvgList) {
      this.createIcon(icon.name, icon.path);
    }
  }

  private createIcon(iconKey: string, path: string) {
    this.iconRegistry.addSvgIcon(
      iconKey,
      this.sanitizer.bypassSecurityTrustResourceUrl(path), // NOSONAR - path is a hardcoded local asset, never user-controlled
    );
  }
}
