import {ElementRef, Injectable, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {CircuitState} from '../circuit-state';
import {svg} from 'd3';
import {CircuitsService} from '../../../services/circuits.service';

@Injectable({
  providedIn: 'root'
})
export class BelgiumState implements CircuitState {
  @ViewChild('circuitContainer', { static: true }) circuitContainer!: ElementRef;  // Non-null assertion
  private circuitGeoJson: any = 'https://raw.githubusercontent.com/bacinger/f1-circuits/refs/heads/master/circuits/be-1925.geojson';

  constructor(private circuitService: CircuitsService) {
  }


  drawCircuit(svg: any, geoJsonData: any, lapData: any): void {
    const projection = d3.geoIdentity().reflectY(true).fitSize([800, 600], geoJsonData);
    const pathGenerator = d3.geoPath().projection(projection);

    // Create the circuit path
    const circuitPath = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: geoJsonData.features[0].geometry.coordinates
      }
    };
    if(lapData){
      const outerGradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'outerGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');

      outerGradient.append('stop').attr('offset', '0%').attr('stop-color', 'blue');
      outerGradient.append('stop').attr('offset', '100%').attr('stop-color', 'red');

      const innerGradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'innerGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');

      innerGradient.append('stop').attr('offset', '0%').attr('stop-color', 'blue');
      innerGradient.append('stop').attr('offset', '100%').attr('stop-color', 'red');
    }
    svg.append('path')
      .datum(circuitPath)
      .attr('d', pathGenerator)
      .attr('class', 'outer-border')
      .attr('fill', 'none')
      .attr('stroke', 'black')  // Black stroke for outer border
      .attr('stroke-width', 8);  // Outer border stroke width

    // Draw the inner border path (smaller stroke width)
    svg.append('path')
      .datum(circuitPath)
      .attr('d', pathGenerator)
      .attr('class', 'inner-border')
      .attr('fill', 'none')
      .attr('stroke', 'url(#innerGradient)')
      .attr('stroke-width', 3);  // Inner border stroke width
  }


  fetchSessionData(circuitId: number): void {
    this.circuitService.getSessions(circuitId).subscribe(data => {
      console.log(data);
    });
  }

  getGeoJsonUrl(): string {
    return this.circuitGeoJson;
  }



}
