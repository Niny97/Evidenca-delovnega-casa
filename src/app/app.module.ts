import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app.routes.js';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';

import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AbsencesComponent } from './absences/absences.component.js';

@NgModule({
  declarations: [
    AppComponent,
    AbsencesComponent,
    SettingsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterOutlet, 
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
