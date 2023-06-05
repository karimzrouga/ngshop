import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';Categorie
import { Observable } from 'rxjs';
import { Categorie } from '../model/Categorie';

@Injectable({
  providedIn: 'root'
})
export class Categorieservice {

    private CategorieUrl = "http://localhost:3000/api/";

    constructor(
      private http: HttpClient
    ) { }
    updateCategorie(Categorie :Categorie): Observable<Categorie>
    {
        return this.http.put<Categorie>(this.CategorieUrl+"Categorieupdate/"+Categorie.idCat,Categorie);
    }
    deleteCategorie(id : number): Observable<Categorie>
    {
        return this.http.delete<Categorie>(this.CategorieUrl+"Categoriedelete"+id);
    }
    addCategorie(Categorie :Categorie): Observable<Categorie>
    {
        return this.http.post<Categorie>(this.CategorieUrl+"Categorieadd",Categorie);
    }
    getCategoriebyid(id : number): Observable<Categorie> {
      return this.http.get<Categorie>(this.CategorieUrl+"Categorie"+id);
      } 

    getallCategorie(): Observable<Categorie[]> {
      return this.http.get<Categorie[]>(this.CategorieUrl+"Categorieall");
      } 
      getCategoriebyemail(email :String ): Observable<Categorie> {
        return this.http.get<Categorie>(this.CategorieUrl+"Categorie/"+email.toLowerCase());
        } 
     
}
