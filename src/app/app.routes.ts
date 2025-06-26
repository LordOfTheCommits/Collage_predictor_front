import { Routes } from '@angular/router';
import { RoundSelectComponent } from './round-select.component';
import { ResultComponent } from './result.component';

export const routes: Routes = [
  { path: '', component: RoundSelectComponent },
  { path: 'wbjee', component: ResultComponent },
];
