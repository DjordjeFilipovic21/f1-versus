import { Component } from '@angular/core';
import { CircuitComponent } from './components/circuit/circuit.component';  // Import the CircuitComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Standalone component
  imports: [CircuitComponent]  // Import CircuitComponent into this standalone component
})
export class AppComponent {
  title = 'My Angular App';
}
