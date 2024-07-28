import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";

const firebaseConfig = {
  apiKey : "AIzaSyAzAy5miRg6iGZREAroFN5peR8kBjZAJjk" ,
  authDomain : "mwork-storage.firebaseapp.com" ,
  projectId : "mwork-storage" ,
  storageBucket : "mwork-storage.appspot.com" ,
  messagingSenderId : "499854925808" ,
  appId : "1:499854925808:web:c7f9af3939f3b905b48735"
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
