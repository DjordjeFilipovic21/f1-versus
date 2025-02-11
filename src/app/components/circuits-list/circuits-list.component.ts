import {Component, OnInit} from '@angular/core';
import {CircuitsService} from '../../services/circuits.service';
import {Router} from '@angular/router';
import {DatePipe, NgClass, NgForOf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Circuit} from '../../model/Circuit';

@Component({
  selector: 'app-circuits-list',
  imports: [
    TableModule,
    DatePipe,
  ],
  templateUrl: './circuits-list.component.html',
  styleUrl: './circuits-list.component.scss'
})
export class CircuitsListComponent implements OnInit {
  circuits: Circuit[] = [];



  constructor(private circuitService: CircuitsService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCircuits();
  }

  goToCircuitDetail(circuitId: string, event?: Event) {
    if (event) event.stopPropagation(); // Prevents row click event from firing as well
    console.log("Navigating to circuit:", circuitId);
    this.router.navigate(['/circuits', circuitId]).then(r => console.log('Navigation result:', r));
  }

  private getCircuits() {
    this.circuitService.getCircuits().subscribe((data: any) => {
      this.circuits = data;
    });
  }


}
