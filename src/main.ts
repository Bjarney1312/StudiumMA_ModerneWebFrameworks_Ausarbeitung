import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import {routeConfig} from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./app/services/in-memory-data.service";
import {MatFormFieldModule} from "@angular/material/form-field";

bootstrapApplication(AppComponent, {
    providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom([
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
      MatFormFieldModule
    ]),

]
})
  .catch((err) => console.error(err));
