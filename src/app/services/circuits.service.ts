import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {CircuitState} from '../components/circuits/circuit-state';
import {map} from 'rxjs/operators';
import {LapData} from '../model/LapData';
import {LocationData} from '../model/LocationData';
import {Driver} from '../model/Driver';

@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  private apiUrl = 'https://api.openf1.org/v1/';
  private backendUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getData(driverNumber: number, sessionKey: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/drivers?driver_number=${driverNumber}&session_key=${sessionKey}`);

  }

  getCircuits(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}meetings?year=2024`);
  }

  getCircuit(meeting_key: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}meetings?meeting_key=${meeting_key}`);
  }

  getSessions(meeting_key: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}sessions?meeting_key=${meeting_key}`);
  }

  getMaxLaps(session_key: number): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}laps?session_key=${session_key}`).pipe(
      map(data => {
        const uniqueLaps = new Set(data.map(lap => lap.lap_number));
        return uniqueLaps.size;
      })
    );
  }

  getDrivers(session_key: number): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}drivers?session_key=${session_key}`);
  }

  fetchLapData(selectedSessionKey: number, driver_number: number, currentLap: number): Observable<LapData> {
    const url = `${this.apiUrl}laps?session_key=${selectedSessionKey}&driver_number=${driver_number}&lap_number=${currentLap}`;
    return this.http.get<LapData>(url);
  }

  getLapAndLocation(session_key: number, driver_number: number, current_lap: number): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.backendUrl}race-replay/${session_key}/${driver_number}/${current_lap}`);
  }


}
