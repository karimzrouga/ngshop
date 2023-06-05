import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Categorieservice } from 'src/app/services/Categories.service';
import Swal from 'sweetalert2';
import { Categorie } from 'src/app/model/Categorie';
@Component({
  selector: 'app-categ',
  templateUrl: './categ.component.html',
  styleUrls: ['./categ.component.css']
})
export class CategComponent implements OnInit {

  categorie: Categorie = new Categorie();
  term:string =""
  categories!: Categorie[];
  totalcategories!: number;
  editFormVisible: boolean = false;
  add: boolean = false;
  edit: boolean = false;
  addFormVisible: boolean = false;
  
  constructor(
    private categorieService: Categorieservice,
    private toastr: NgToastService,
    private router: Router,


  ) {}
 
  ngOnInit(): void {
    this.getallcategorie();
  }

  redirectToList() {
    this.router.navigate(['/']);
  }

  createcategorie() {
    this.categorieService.addCategorie(this.categorie).subscribe(
      (data) => {

        this.toastr.success({
          detail: 'categorie publié avec succès!',
          summary: '',
          duration: 5000,
        });
      
        this.getallcategorie();
        this.redirectToList();
      },
      (error) => {
        this.toastr.error({
          detail: 'Serveur ne répond pas!',
          summary: '',
          duration: 5000,
        });
       
      }
    );
  }

  getallcategorie() {
    this.categorie = new Categorie();
    this.categorieService.getallCategorie().subscribe(
      (data) => {
        if (data != null) {
          this.categories = data;
          this.totalcategories = data.length;
        } else {
          this.totalcategories = 0;
          this.categories = [];
        }
      },
      (error) => {
        this.toastr.error({
          detail: 'Serveur ne répond pas!',
          summary: '',
          duration: 5000,
        });
      }
    );
  }

  deletecategorie(categorie :Categorie) {
  
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this categorie!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.categorieService.deleteCategorie(categorie.idCat).subscribe(
          (data) => {
            this.toastr.success({
              detail: 'categorie supprimée!',
              summary: '',
              duration: 5000,
            });
            this.getallcategorie()
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

  editcategorie(id: number) {
    this.categorieService.getCategoriebyid(id).subscribe((data) => {
      this.categorie = data;

      this.showEditForm();
      this.gotoTop()
    });
  }
 
  update() {
    this.categorieService.updateCategorie(this.categorie).subscribe((data) => {
      this.categorie = data;
      this.toastr.success({
        detail: 'categorie modifier avec succès!',
        summary: '',
        duration: 5000,
      });
      this.hideEditForm();
      this.getallcategorie();
    });
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
