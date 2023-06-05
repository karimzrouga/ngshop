import { Injectable } from '@angular/core';
import { User } from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class Shared {

  client : User =new User();
  constructor() { }

  Setclient (sclient :User)
  {
    
    this.client =sclient
  }
  Getclient () :User
  {
    return this.client
  }
  
}
