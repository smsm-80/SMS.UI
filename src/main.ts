import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // provideHttpClient(),
    provideRouter(routes),
    provideAnimations(), // Use this instead of provideAnimationsAsync for standard animations
    provideHttpClient(withFetch()),
  ]
}).catch(err => console.error(err));
