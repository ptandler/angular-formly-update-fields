import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideAnimations} from "@angular/platform-browser/animations";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";

/*
bootstrapApplication(AppComponent,
  {providers: [provideAnimations()]})
  .catch(err => console.error(err));
*/

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
