import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StatComponent } from './pages/stat/stat.component';

import { AuthGuard } from './services/AuthGuard.service';
import { CategComponent } from './pages/categ/categ.component';
import { RayonsComponent } from './pages/rayons/rayons.component';



const routes: Routes = [  { path: "categ", component: CategComponent  }, 
{ path: "login", component: LoginComponent   },
{ path: "stat", component: StatComponent  },
{ path: "profile", component: ProfileComponent  },
{ path: "prod", component: ProductsComponent  },
{ path: "rayon", component: RayonsComponent  },
{ path: "**", redirectTo: "stat", pathMatch: "full"   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
