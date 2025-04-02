import { Observable } from "rxjs";
import { DetailClientResponse, ListClientResponse, SaveClientRequest, SaveClientResponse, UpdateClientResponse, UptadeClientRequest } from "./client.models";

export interface IClientService {

  save(request: SaveClientRequest): Observable<SaveClientResponse>

  update(id: number, request: UptadeClientRequest): Observable<UpdateClientResponse>

  delete(id: number): Observable<void>

  list(): Observable<ListClientResponse[]>

  findById(id: number): Observable<DetailClientResponse>
}
