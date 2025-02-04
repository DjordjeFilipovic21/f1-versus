import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.scss']
})
export class CircuitComponent implements OnInit {
  @ViewChild('circuitContainer', { static: true }) circuitContainer!: ElementRef;  // Non-null assertion
  svg: any;

  ngOnInit(): void {
    this.loadCircuitData();
  }

  loadCircuitData() {
    const url = 'https://raw.githubusercontent.com/bacinger/f1-circuits/refs/heads/master/circuits/be-1925.geojson';
    // Fetch the GeoJSON data
    d3.json(url).then((data: any) => {
      console.log('GeoJSON data loaded:', data);  // Check the GeoJSON data in the console
      this.createSvg();
      this.drawCircuit(data);
    }).catch(error => {
      console.error('Error loading GeoJSON:', error);  // Catch and log any errors
    });
  }

  createSvg() {
    // Set the dimensions for the SVG container
    const width = 800;
    const height = 600;

    this.svg = d3.select(this.circuitContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
  }

  drawCircuit(data: any) {
    // Extract the coordinates for the LineString geometry
    const circuitCoordinates = data.features[0].geometry.coordinates;

    if (!circuitCoordinates || circuitCoordinates.length === 0) {
      console.error('No coordinates found in GeoJSON.');
      return;
    }

    // Create a projection to map lat/lon to x/y coordinates
    const projection = d3.geoMercator()
      .center(    [5.959602, 50.427678] ) // Center on Las Vegas (Longitude, Latitude)
      .scale(500000) // Increase the scale value for zooming in
      .translate([this.svg.attr('width') / 2, this.svg.attr('height') / 2]);

    const path = d3.geoPath().projection(projection);

    // Create a linear gradient with 5 stops for alternating blue and red
    const gradient = this.svg.append('defs')
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
    this.svg.append('path')
      .data([circuitPath])
      .attr('class', 'circuit-path')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'url(#circuitGradient)')  // Apply the gradient here
      .attr('stroke-width', 1);
  }



}
