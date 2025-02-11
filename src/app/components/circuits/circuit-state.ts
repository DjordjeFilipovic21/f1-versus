export interface CircuitState {
  drawCircuit(svg: any, geoJsonData: any): void;

  fetchSessionData(circuitId: number): void;
  getGeoJsonUrl(): string;
}
