import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CircuitState} from '../circuits/circuit-state';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CircuitsService} from '../../services/circuits.service';
import * as d3 from 'd3';
import {CircuitStateFactory} from '../circuits/circuit-state-factory';
import {NgForOf, NgIf} from '@angular/common';
import {Session} from '../../model/Session';
import {Driver} from '../../model/Driver';
import {Tooltip} from 'primeng/tooltip';
import {LapData} from '../../model/LapData';


@Component({
  selector: 'app-circuits-detail',
  templateUrl: './circuits-detail.component.html',
  imports: [
    NgForOf,
    NgIf,
    Tooltip,
  ],
  styleUrl: './circuits-detail.component.scss'
})
export class CircuitsDetailComponent implements OnInit {
  @ViewChild('circuitContainer', { static: true }) circuitContainer!: ElementRef;
  circuitState!: CircuitState;
  circuitId!: number;
  svg: any;
  circuitName = "";
  sessions: Session[] = [];
  selectedSessionKey!: number;
  maxLaps: number | null = null;
  currentLap: number = 1;
  drivers: Driver[] = [];
  selectedDriver: Driver | null = null;
  locationData: any[] = [];
  locationIndex: number = 0;
  intervalId: any;

  constructor(private route: ActivatedRoute,
              private circuitService: CircuitsService,
              private circuitFactory: CircuitStateFactory) {}

  ngOnInit(): void {
    this.circuitId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Circuit ID from URL:", this.circuitId);
    this.loadCircuit();
  }

  loadCircuit(): void {
    this.circuitService.getCircuit(this.circuitId).subscribe((data) => {
      this.circuitName = data[0].circuit_short_name;
      console.log("Circuit name:", this.circuitName);

      this.circuitState = this.circuitFactory.getCircuitState(this.circuitName);
      this.drawCircuit(null);
      this.circuitService.getSessions(this.circuitId).subscribe((data: any) => {
        this.sessions = data;
        this.selectedSessionKey = this.sessions[0].session_key;
        this.loadDrivers(this.selectedSessionKey);
        this.onTabChange(this.selectedSessionKey);
      });

    });
  }

  drawCircuit(lapData: any): void {
    const geoJsonUrl = this.circuitState.getGeoJsonUrl();
    d3.json(geoJsonUrl).then((data: any) => {
      this.createSvg();
      this.circuitState.drawCircuit(this.svg, data, lapData);
    });
  }

  drawDot(location: any): void {
    const projection = d3.geoIdentity().reflectY(true).translate([-309, -100]);
    const scaleFactor = 0.1;
    const projectedLocation = projection([location.x * scaleFactor, location.y * scaleFactor]);
    if (projectedLocation) {
      const [x, y] = projectedLocation;
      this.svg.selectAll('.location-dot').remove();

      console.log('Drawing dot at:', x, y);
      this.svg.append('circle')
        .attr('class', 'location-dot')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 5)
        .attr('fill', 'red');
    }
  }

  moveDot(): void {
    if (this.locationIndex < this.locationData.length) {
      this.drawDot(this.locationData[this.locationIndex]);
      this.locationIndex++;
    } else {
      this.stopMovement();
    }
  }

  startMovement(): void {
    this.stopMovement();
    this.locationIndex = 0;
    this.intervalId = setInterval(() => this.moveDot(), 500);
  }

  stopMovement(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  selectDriver(driver: Driver | null): void {
    this.selectedDriver = driver;
    if (this.selectedDriver) {
      this.circuitService.getLapAndLocation(this.selectedSessionKey, this.selectedDriver.driver_number, this.currentLap)
        .subscribe((lapData: any) => {
          this.drawCircuit(lapData);
          console.log('Lap Data:', lapData);
          this.locationData = lapData.locations;
          this.drawDot(this.locationData[0]);
          console.log('Location Data:', this.locationData[0]);
        });
    }
  }

  createSvg(): void {
    if (this.svg) {
      this.svg.selectAll('*').remove();
    } else {
      this.svg = d3.select(this.circuitContainer.nativeElement)
        .append('svg')
        .attr('width', 800)
        .attr('height', 600);
    }
  }

  onTabChange(sessionKey: number): void {
    this.maxLaps = null;
    this.selectedSessionKey = sessionKey;
    this.circuitState.fetchSessionData(this.selectedSessionKey);
    this.circuitService.getMaxLaps(this.selectedSessionKey).subscribe(laps => {
      this.maxLaps = laps;
      this.currentLap = 1;
      console.log('Max Laps:', this.maxLaps);
    });
  }

  loadDrivers(sessionKey: number): void {
    this.circuitService.getDrivers(sessionKey).subscribe(drivers => {
      this.drivers = drivers;
    });
  }

  incrementLap(): void {
    if (this.maxLaps !== null && this.currentLap < this.maxLaps) {
      this.currentLap++;
      this.selectDriver(this.selectedDriver);
    }
  }

  decrementLap(): void {
    if (this.currentLap > 1) {
      this.currentLap--;
      this.selectDriver(this.selectedDriver);
    }
  }
}
