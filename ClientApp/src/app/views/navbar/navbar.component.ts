import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  standalone: true,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(

    private route : Router
  ){}
  onLogout() {
    sessionStorage.clear();
    return this.route.navigate(['/login']);
  }
}
