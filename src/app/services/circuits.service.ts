import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {CircuitState} from '../components/circuits/circuit-state';
import {map} from 'rxjs/operators';
import {LapData} from '../model/LapData';
import {LocationData} from '../model/LocationData';

@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  private apiUrl = 'https://api.openf1.org/v1/';

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




}
