import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { SnackBarComponent } from './snack-bar.component';
import { SnackBarData } from '../../models/snack-bar-data.model';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;

  const snackBarData: SnackBarData = {
    message: 'Test message',
    icon: 'error',
    matSnackBar: jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['dismiss']),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarComponent, MatIconTestingModule],
      providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: snackBarData }],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
