import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// UTILS
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url, head: HttpHeaders): Observable<any> {
    return this.http.get(url, { headers: head });
  }

  post(url: string, body: any, head: HttpHeaders, param: any): Observable<any> {
    return this.http.post(url, body, { headers: head, params: param });
  }
}
