import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rayon } from '../model/Rayon';

@Injectable({
  providedIn: 'root'
})
export class Rayonservice {

    private RayonUrl = "http://localhost:3000/api/";

    constructor(
      private http: HttpClient
    ) { }
    updateRayon(Rayon :Rayon ): Observable<Rayon>
    {
        return this.http.put<Rayon>(this.RayonUrl,Rayon);
    }
    deleteRayon(id : number): Observable<Rayon>
    {
        return this.http.delete<Rayon>(this.RayonUrl+"/"+id);
    }
    addRayon(Rayon :Rayon): Observable<Rayon>
    {
        return this.http.post<Rayon>(this.RayonUrl+"",Rayon);
    }
    getRayonbyid(id : number): Observable<Rayon> {
      return this.http.get<Rayon>(this.RayonUrl+""+id);
      } 

    getallRayon(): Observable<Rayon[]> {
      return this.http.get<Rayon[]>(this.RayonUrl+"");
      } 
    
        
}
