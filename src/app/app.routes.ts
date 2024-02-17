import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { AbsencesComponent } from './absences/absences.component';

export const routes: Routes = [
    { path: '', redirectTo: 'settings', pathMatch: 'full' },
    { path: 'settings', component: SettingsComponent, title: 'Settings page' },
    { path: 'users', component: UsersComponent },
    { path: 'absences', component: AbsencesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

  