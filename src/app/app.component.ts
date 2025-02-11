import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Standalone component
  imports: [RouterOutlet]  // Import CircuitComponent into this standalone component
})
export class AppComponent {
  title = 'My Angular App';
}
