import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../Model/experiencia';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SExperienciaService {
  URL= enviroment.URL + 'explab/';
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Experiencia[]>{ //en teoria falta un corchete para hacerlo tipo lista
    return this.httpClient.get<Experiencia[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<Experiencia>{
    return this.httpClient.get<Experiencia>(this.URL + `detail/${id}`);
  }

  public save(experiencia: Experiencia): Observable<any>{
    return this.httpClient.post<any>(this.URL + `create`, experiencia);

  }

  public update(id: number, experiencia: Experiencia): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, experiencia);
  }

  public delete(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.URL+`delete/${id}`);
  }
  }

