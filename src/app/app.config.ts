import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./Config/Interceptor/auth.interceptor";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFireAuth} from "@angular/fire/compat/auth";
const firebaseConfig = {
  apiKey : "AIzaSyAzAy5miRg6iGZREAroFN5peR8kBjZAJjk" ,
  authDomain : "mwork-storage.firebaseapp.com" ,
  projectId : "mwork-storage" ,
  storageBucket : "mwork-storage.appspot.com" ,
  messagingSenderId : "499854925808" ,
  appId : "1:499854925808:web:c7f9af3939f3b905b48735"
};
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireDatabaseModule,
      AngularFireStorage,
      AngularFireAuth
    ]),
    // provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // provideFirestore(() => getFirestore()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ]
};
