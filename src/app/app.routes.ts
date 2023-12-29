import { Routes } from '@angular/router';
import { AtsComponent } from './ats/ats.component';

export const routes: Routes = [
  {
    path: 'ats',
    component: AtsComponent,
  },
  {
    path: '**',
    redirectTo: 'ats',
  },
];
