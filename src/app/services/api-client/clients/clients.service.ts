import { Injectable } from '@angular/core';
import { IClientService } from './iclients.service';
import { Observable } from 'rxjs';
import { SaveClientRequest, SaveClientResponse, UptadeClientRequest, UpdateClientResponse, ListClientResponse, DetailClientResponse } from './client.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ClientsService implements IClientService {

  private readonly basePath = environment.apiUrl

  constructor(private http: HttpClient) { }


  save(request: SaveClientRequest): Observable<SaveClientResponse> {
    console.log(request)
    return this.http.post<SaveClientResponse>(`${this.basePath}clients`, request)
  }
  update(id: number, request: UptadeClientRequest): Observable<UpdateClientResponse> {
    return this.http.put<UpdateClientResponse>(`${this.basePath}clients/${id}`, request)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}clients/${id}`)
  }
  list(): Observable<ListClientResponse[]> {
    return this.http.get<ListClientResponse[]>(`${this.basePath}clients`)
  }
  findById(id: number): Observable<DetailClientResponse> {
    return this.http.get<DetailClientResponse>(`${this.basePath}clients/${id}`)
  }
}
