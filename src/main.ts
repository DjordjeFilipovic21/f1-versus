import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppModule } from './app/app.module';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppModule),// Import AppModule providers
    provideRouter(routes)  // Provide your routes
  ]
})
  .catch(err => console.error(err));
