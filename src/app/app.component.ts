import {CircuitComponent} from './components/circuits/spa-francorchamps/circuit.component';
import {Component} from '@angular/core';
import {CircuitsListComponent} from './components/circuits-list/circuits-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Standalone component
  imports: [CircuitComponent, CircuitsListComponent]  // Import CircuitComponent into this standalone component
})
export class AppComponent {
  title = 'My Angular App';
}
