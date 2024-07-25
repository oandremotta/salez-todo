import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { LucideAngularModule, icons } from 'lucide-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(LucideAngularModule.pick(icons),),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({"projectId":"todoist-selaz","appId":"1:516532084998:web:5e3f911771f4767c0bbe87","storageBucket":"todoist-selaz.appspot.com","apiKey":"AIzaSyBTPMGfuACBKaLcTFnta3VyfdxOXhg_ozo","authDomain":"todoist-selaz.firebaseapp.com","messagingSenderId":"516532084998"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
});
