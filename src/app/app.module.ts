import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { HeaderComponent } from './layout/header/header.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ProductsComponent } from './pages/products/products.component';
import { StatComponent } from './pages/stat/stat.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './login/login.component';

import { NgToastModule } from 'ng-angular-popup'
import { AuthGuard } from './services/AuthGuard.service';

import { CategComponent } from './pages/categ/categ.component';

import { RayonsComponent } from './pages/rayons/rayons.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  
    HeaderComponent,

    StatComponent,
    ProductsComponent,
    ProfileComponent,
    LoginComponent,
 
  CategComponent,
  RayonsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,  ChartsModule,
    ReactiveFormsModule, 
    Ng2SearchPipeModule,
    NgToastModule ,
    ReactiveFormsModule
   
    
  ],
  providers: [ AuthGuard],
  bootstrap: [AppComponent],
  exports: [
    SidebarComponent,
 
    HeaderComponent,
CategComponent,
    ProductsComponent,
    ProfileComponent,
    LoginComponent,
    CategComponent,
    RayonsComponent,
 
  ]
})
export class AppModule { }
