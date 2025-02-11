import {ElementRef, Injectable, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {CircuitState} from '../circuit-state';

@Injectable({
  providedIn: 'root'
})
export class SpielbergState implements CircuitState {
  @ViewChild('circuitContainer', { static: true }) circuitContainer!: ElementRef;
  private circuitGeoJson: any = 'https://raw.githubusercontent.com/bacinger/f1-circuits/refs/heads/master/circuits/at-1969.geojson';

  drawCircuit(svg: any, data: any): void {
    const projection = d3.geoIdentity().reflectY(true).fitSize([800, 600], data);
    const pathGenerator = d3.geoPath().projection(projection);

    const circuitPath = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: data.features[0].geometry.coordinates
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
    console.log('Fetching session data for Spielberg...');
  }

  getGeoJsonUrl(): string {
    return this.circuitGeoJson;
  }
}
