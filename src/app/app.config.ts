import { ApplicationConfig, DEFAULT_CURRENCY_CODE, InjectionToken, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { CurrencyPipe } from '@angular/common';
import { CartSourceService } from './services/cart-source.service';
import { provideHttpClient } from '@angular/common/http';

export const DEFAULT_COUNTRY_CODE = new InjectionToken<string>('DEFAULT_COUNTRY_CODE');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'it-IT'},
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    CurrencyPipe,
    { provide: DEFAULT_COUNTRY_CODE, useValue: 'IT' }
  ]
};
