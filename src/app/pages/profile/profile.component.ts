import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';

import { NgToastService } from 'ng-angular-popup';
import { userservice } from 'src/app/services/user.service';
const USER_KEY = 'auth-user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userservices: userservice,
    private router: Router,
    private toastr: NgToastService
  ) {
    this.createForm();
  }
  adminForm!: FormGroup;
  passwordForm!: FormGroup;
  user: User = new User();
  check: boolean = false;
  cpassword: String = '';
  npassword: String = '';
  cedit = false;
  imageUrl: any;
  file: any;
  fileSelected: boolean = false;
  selectedFile!: File;
  ngOnInit(): void {
    this.getusers();
  }

  createForm() {
    this.passwordForm = new FormGroup({
      npassword: new FormControl('', [Validators.required]),
      oldpassword: new FormControl('', [Validators.required]),
    });
    this.adminForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });
  }

  getusers() {
    if (window.sessionStorage.getItem(USER_KEY) != null) {
      this.user = JSON.parse(window.sessionStorage.getItem(USER_KEY) || '{}');
    }

    this.userservices.getuserbyid(this.user.id).subscribe((data) => {
      this.user = data;
      console.log(data);
      this.adminForm.setValue(this.user);
    });
  }

  show() {
    this.check = true;
  }
  hide() {
    this.check = false;
  }
  get f() {
    return this.adminForm.controls;
  }
  edit() {
    if (this.adminForm.valid) {
      this.cpassword = this.passwordForm.get('oldpassword')?.value;
      this.npassword = this.passwordForm.get('npassword')?.value;
      if (this.cpassword.length == 0 && this.npassword.length == 0) {
        this.userservices.updateuser(this.user).subscribe((data: User) => {
          this.user = data;
          this.toastr.success({
            detail: ' modifier avec succès',
            summary: '',
            duration: 5000,
          });
          this.router.navigate(['/profile']);
        });
      } else {
        if (this.passwordForm.get('oldpassword')?.value == this.user.password) {
          if (this.npassword.length > 8) {
            this.user.password = this.npassword;

            this.userservices.updateuser(this.user).subscribe((data) => {
              console.log(data);
              this.user = data;
              this.toastr.success({
                detail: ' modifier avec succès',
                summary: '',
                duration: 5000,
              });
              this.router.navigate(['/login']);
            });
          } else {
            this.toastr.error({
              detail: 'new Password Invalide',
              summary: '',
              duration: 5000,
            });
          }
        } else {
          this.toastr.error({
            detail: ' Old Password Incorrect',
            summary: '',
            duration: 5000,
          });
        }
      }
    }
  }

  UploadFile() {
   
  }

  public changeImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.toastr.error({
          detail: 'merci de sélectionner une image valide',
          summary: '',
          duration: 5000,
        });
        this.fileSelected = true;
        return;
      }
      this.UploadFile();
      var reader = new FileReader();
      this.file = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imageUrl = reader.result;
      };

      this.fileSelected = true;
    }
  }
}
