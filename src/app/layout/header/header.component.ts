import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
logout()
{
  window.sessionStorage.removeItem( USER_KEY)
  this.router.navigate(['/login']);
}
}
