import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import {CircuitState} from '../circuit-state';

@Component({
  selector: 'app-circuit',
  templateUrl: './belgium-state.html',
  styleUrls: ['./belgium-state.scss']
})
export class BelgiumState implements CircuitState {
  @ViewChild('circuitContainer', { static: true }) circuitContainer!: ElementRef;  // Non-null assertion


  drawCircuit(svg: any, geoJsonData: any): void {
    // Extract the coordinates for the LineString geometry
    const circuitCoordinates = geoJsonData.features[0].geometry.coordinates;

    if (!circuitCoordinates || circuitCoordinates.length === 0) {
      console.error('No coordinates found in GeoJSON.');
      return;
    }

    // Create a projection to map lat/lon to x/y coordinates
    const projection = d3.geoMercator()
      .center(    [5.959602, 50.427678] ) // Center on Las Vegas (Longitude, Latitude)
      .scale(500000) // Increase the scale value for zooming in
      .translate([svg.attr('width') / 2, svg.attr('height') / 2]);

    const path = d3.geoPath().projection(projection);

    // Create a linear gradient with 5 stops for alternating blue and red
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'circuitGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    // Define the gradient stops for 5 alternating sections (blue, red, blue, red, blue)
    const colors = ['blue', 'red', 'blue', 'red', 'blue', 'red', 'blue'];
    const numStops = colors.length;
    const offsetStep = 100 / numStops;

    colors.forEach((color, index) => {
      gradient.append('stop')
        .attr('offset', `${index * offsetStep}%`)
        .attr('stop-color', color);
    });

    // Create the circuit path
    const circuitPath = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: circuitCoordinates
      }
    };

    // Draw the path with the gradient
    svg.append('path')
      .data([circuitPath])
      .attr('class', 'circuit-path')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'url(#circuitGradient)')  // Apply the gradient here
      .attr('stroke-width', 1);

  }

  fetchSessionData(): void {
    console.log('Fetching session data for Belgium...');
  }







}
