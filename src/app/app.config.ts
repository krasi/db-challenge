import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { storageSyncMetaReducer } from 'ngrx-store-persist';

import { routes } from './app.routes';
import { userReducer } from './store/user/user.reducer';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { rememberReducer } from './store/remember/remember.reducer';
import { RememberEffects } from './store/remember/remember.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    provideStore(
      {
        users: userReducer,
        auth: authReducer,
        remember: rememberReducer,
      },
      {
        metaReducers: [storageSyncMetaReducer],
      },
    ),
    provideEffects(AuthEffects, RememberEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
