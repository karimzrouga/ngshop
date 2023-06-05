import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class statesticservice {

    private statUrl = "http://localhost:3000/api/";

    constructor(
      private http: HttpClient
    ) { }


    get(): Observable<any[]> {
      return this.http.get<any[]>(this.statUrl+"stats");
      } 
    
   
}
