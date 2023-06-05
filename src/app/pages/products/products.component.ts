import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Produit } from '../../model/Produit';
import { produitservice } from '../../services/produit.service';
import { NgToastService } from 'ng-angular-popup';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  produit: Produit = new Produit();
  produits!: Produit[];
 
  term: string = '';
  add: boolean = false;
  edit: boolean = false;
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  
  totalFormations!: number;

  prodForm!: FormGroup;
  constructor(
    private ProduitService: produitservice,
    private toastr: NgToastService,
    private router: Router,
 
  ) {
    this.createForm();
  }
  createForm() {
    this.prodForm = new FormGroup({
      marque: new FormControl('', [Validators.required]),
      colibellenstructeur: new FormControl('', [Validators.required]),
      grammage: new FormControl('', [Validators.required]),
      prixPdt: new FormControl('', [Validators.required]),
      nomMagasin: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  updateproduit(id: number) {
    this.ProduitService.updateProduit(
      this.produit,
      this.produit.idP
    ).subscribe((data) => {
      this.toastr.success({
        detail: 'Produit modifier avec succès',
        summary: '',
        duration: 5000,
      });
      this.produit = data;
      this.editFormVisible = false;
      this.getallProduit();
    });
  }

  
  totalProduits!: number;

  ngOnInit(): void {
    this.getallProduit();
  }

  redirectToList() {
    this.router.navigate(['/prod']);
  }
  createProduit() {
 
    if (this.prodForm.valid) {
      this.ProduitService.addProduit(this.produit).subscribe(
        (data) => {
          this.toastr.success({
            detail: 'Produit publié avec succès',
            summary: '',
            duration: 5000,
          });
          this.getallProduit();
          this.hideAddForm();
          this.redirectToList();
        },
        (error) => {
          this.toastr.error({
            detail: 'Erreur, Serveur ne répond pas!',
            summary: '',
            duration: 5000,
          });
        }
      );
    }
  }
  get f() {
    return this.prodForm.controls;
  }

  getallProduit() {
    this.produit = new Produit();
    this.ProduitService.getallProduit().subscribe(
      (data) => {
        if (data != null) {
          this.produits = data;
          this.totalProduits = data.length;
        } else {
          this.totalProduits = 0;
          this.produits = [];
        }
      },
      (error) => {
        this.toastr.error({
          detail: 'Erreur, Serveur ne répond pas!',
          summary: '',
          duration: 5000,
        });
      }
    );
  }

  deleteProduit(id: number) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this produit!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.ProduitService.deleteProduit(id).subscribe(
          (data) => {
            this.getallProduit();
            this.toastr.success({
              detail: 'Produit supprimée!',
              summary: '',
              duration: 5000,
            });
            this.getallProduit();
          },
          (error) => {
            this.toastr.error({
              detail: 'Erreur, Serveur ne répond pas!',
              summary: '',
              duration: 5000,
            });
          }
        );
      }
    });
  }

  editProduit(id: number) {
    this.gotoTop();
    this.ProduitService.getProduitbyid(id).subscribe((data) => {
      this.produit = data;
    
      this.editFormVisible = true;
    });
  }
  onswitch(Pr: Produit, event: any) {
  
    this.produit = Pr;
    this.updateproduit(Pr.idP);
    this.getallProduit();
  }


  showAddForm() {
    this.addFormVisible = true;
  }
  hideAddForm() {
    this.gotoTop();
   
    this.addFormVisible = false;
  }

  showEditForm() {
    this.editFormVisible = true;
  }
  hideEditForm() {

    this.editFormVisible = false;
  }

 

  gotoTop() {
    window.scroll({
      top: 10,
      left: 0,
      behavior: 'smooth',
    });
  }
}
