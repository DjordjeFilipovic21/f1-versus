import {RouterModule, Routes} from '@angular/router';
import {CircuitsListComponent} from './components/circuits-list/circuits-list.component';
import {CircuitsDetailComponent} from './components/circuits-detail/circuits-detail.component';

export const routes: Routes = [
  { path: 'circuits', component: CircuitsListComponent },
  { path: 'circuits/:id', component: CircuitsDetailComponent },

  // ✅ This properly redirects '/' to '/circuits'
  { path: '', pathMatch: 'full', redirectTo: 'circuits' },
];

