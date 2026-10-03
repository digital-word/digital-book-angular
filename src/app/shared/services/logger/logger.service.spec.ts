import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log to console when not in production', () => {
    const consoleSpy = spyOn(console, 'log');

    service.log('message', 'extra');

    expect(consoleSpy).toHaveBeenCalledWith('message', 'extra');
  });

  it('should always log errors to console', () => {
    const consoleSpy = spyOn(console, 'error');

    service.error('error message');

    expect(consoleSpy).toHaveBeenCalledWith('error message');
  });
});
