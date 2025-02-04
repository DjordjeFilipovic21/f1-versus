import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppModule } from './app/app.module';  // Import your module

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppModule)  // Import AppModule providers
  ]
})
  .catch(err => console.error(err));
