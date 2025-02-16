export interface CircuitState {
  drawCircuit(svg: any, geoJsonData: any, lapData: any): void;

  fetchSessionData(circuitId: number): void;
  getGeoJsonUrl(): string;
}
