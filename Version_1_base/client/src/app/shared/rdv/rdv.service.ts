import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIna: 'root'})
export class RdvService {
  public API = 'http://localhost:8080';
  public RDV_API = this.API + '/rdvs';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/rdv-liste');
  }

  get(id: string) {
    return this.http.get(this.RDV_API + '/' + id);
  }

  save(rdv: any): Observable<any> {
    let result: Observable<any>;
    if (rdv.href) {
      result = this.http.put(rdv.href, rdv);
    } else {
      result = this.http.post(this.RDV_API, rdv);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
