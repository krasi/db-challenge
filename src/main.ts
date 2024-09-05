import { bootstrapApplication } from '@angular/platform-browser';
import {
  getAllDataFromLocalForage,
  default as localForage,
} from 'ngrx-store-persist';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

(async () => {
  await getAllDataFromLocalForage({
    driver: localForage.LOCALSTORAGE,
    keys: ['users'],
  });
  await bootstrapApplication(AppComponent, appConfig);
})().catch((err) => console.error(err));
