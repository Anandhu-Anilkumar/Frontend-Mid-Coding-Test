import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private _http: HttpClient) {}

  getUsers(): Observable<any> {
    const url: string = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';
    return this._http.get(url);
  }
}
