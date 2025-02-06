import {BelgiumState} from './components/circuits/spa-francorchamps/belgium-state';
import {Component} from '@angular/core';
import {CircuitsListComponent} from './components/circuits-list/circuits-list.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Standalone component
  imports: [CircuitsListComponent, RouterOutlet]  // Import CircuitComponent into this standalone component
})
export class AppComponent {
  title = 'My Angular App';
}
