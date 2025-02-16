import {ElementRef, Injectable, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {CircuitState} from '../circuit-state';
import {CircuitsService} from '../../../services/circuits.service';

@Injectable({
  providedIn: 'root'
})
export class MonzaState implements CircuitState {

  @ViewChild('circuitContainer', { static: true }) circuitContainer!: ElementRef;

  constructor(private circuitService: CircuitsService) {}

  private circuitGeoJson: any = 'https://raw.githubusercontent.com/bacinger/f1-circuits/refs/heads/master/circuits/it-1922.geojson';

  drawCircuit(svg: any, geoJsonData: any, lapData: any): void {
    const projection = d3.geoIdentity().reflectY(true).fitSize([800, 600], geoJsonData);
    const pathGenerator = d3.geoPath().projection(projection);

    const circuitPath = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: geoJsonData.features[0].geometry.coordinates
      }
    };

    svg.append('path')
      .datum(circuitPath)
      .attr('d', pathGenerator)
      .attr('class', 'circuit-path')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 3);
  }

  fetchSessionData(circuitId: number): void {
  }

  getGeoJsonUrl(): string {
    return this.circuitGeoJson;
  }
}
