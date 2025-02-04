// circuit.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Openf1Service {

  private apiUrl = 'https://api.openf1.org/v1/';

  constructor(private http: HttpClient) { }

  getData(driverNumber: number, sessionKey: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/drivers?driver_number=${driverNumber}&session_key=${sessionKey}`);

  }

  getSession(sessionKey: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sessions?session_key=9158`);

  }
}
