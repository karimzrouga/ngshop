import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Rayon } from 'src/app/model/Rayon';
import { Rayonservice } from 'src/app/services/Rayon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rayons',
  templateUrl: './rayons.component.html',
  styleUrls: ['./rayons.component.css']
})
export class RayonsComponent implements OnInit {

  rayon: Rayon = new Rayon();
  rayons!: Rayon[];
 
  term: string = '';
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  add: boolean = false;
  edit: boolean = false;
  totalFormations!: number;
  
  prodForm!: FormGroup;
  constructor(
    private rayonService: Rayonservice,
    private toastr: NgToastService,
    private router: Router,
   
  ) {
    this.createForm();
  }
  createForm() {
    this.prodForm = new FormGroup({
      nomR: new FormControl('', [Validators.required]),
    });
  }

  updaterayon(id: number) {
    this.rayonService.updateRayon(
      this.rayon,
    //  this.rayon.data.idR
    ).subscribe((data) => {
      this.toastr.success({
        detail: 'rayon modifier avec succès',
        summary: '',
        duration: 5000,
      });
      this.rayon = data;
      this.editFormVisible = false;
      this.getallrayon();
    });
  }


  totalrayons!: number;

  ngOnInit(): void {
    this.getallrayon();
  }
  update(){
    
  }
 
  
  createrayon() {
    this.add = true;
    if (this.prodForm.valid) {
      this.rayonService.addRayon(this.rayon).subscribe(
        (data) => {
          this.toastr.success({
            detail: 'rayon publié avec succès',
            summary: '',
            duration: 5000,
          });
          this.getallrayon();
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

  getallrayon() {
    this.rayon = new Rayon();
    this.rayonService.getallRayon().subscribe(
      (data) => {
        if (data != null) {
          this.rayons = data;
          this.totalrayons = data.length;
        } else {
          this.totalrayons = 0;
          this.rayons = [];
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

  deleterayon(id: number) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this rayon!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.rayonService.deleteRayon(id).subscribe(
          (data) => {
            this.getallrayon();
            this.toastr.success({
              detail: 'rayon supprimée!',
              summary: '',
              duration: 5000,
            });
            this.getallrayon();
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

  editrayon(id: number) {
    this.gotoTop();
    this.rayonService.getRayonbyid(id).subscribe((data) => {
      this.rayon = data;
      this.editFormVisible = true;
    });
  }
 

  hideAddForm() {
    this.gotoTop();
    this.add = false;
    this.addFormVisible = false;
  }

  showEditForm() {
    this.editFormVisible = true;
  }
  hideEditForm() {
    this.add = false;
    this.editFormVisible = false;
  }
 
  redirectToList() {
    this.router.navigate(['/rayon']);
  }

  showAddForm() {
    this.addFormVisible = true;
  }
 
  gotoTop() {
    window.scroll({
      top: 10,
      left: 0,
      behavior: 'smooth',
    });
  }
}
