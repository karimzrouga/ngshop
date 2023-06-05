import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/Produit';

@Injectable({
  providedIn: 'root'
})
export class produitservice {

    private ProduitUrl = "http://localhost:3000/api/produit";

    constructor(
      private http: HttpClient
    ) { }
    updateProduit(Produit :Produit , id :number): Observable<Produit>
    {
        return this.http.put<Produit>(this.ProduitUrl+"Produitupdate/"+id,Produit);
    }
    deleteProduit(id : number): Observable<Produit>
    {
        return this.http.delete<Produit>(this.ProduitUrl+"/"+id);
    }
    addProduit(Produit :Produit): Observable<Produit>
    {
        return this.http.post<Produit>(this.ProduitUrl,Produit);
    }
    getProduitbyid(id : number): Observable<Produit> {
      return this.http.get<Produit>(this.ProduitUrl+"/"+id);
      } 

    getallProduit(): Observable<Produit[]> {
      return this.http.get<Produit[]>(this.ProduitUrl);
      } 
      excelProduit( url :string): Observable<string[]> {
        return this.http.get<string[]>(this.ProduitUrl+"getentete/"+url);
        } 
        alimentProduit(ids : string,url :string): Observable<string[]> {
          return this.http.get<string[]>(this.ProduitUrl+"get/"+ids+"/"+url);
          } 
        
}
