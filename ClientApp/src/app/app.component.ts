import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './views/navbar/navbar.component';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  showNavbar: boolean = false;
  // ngOnInit(): void {
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe((event: NavigationEnd) => {
  //     // แสดง navbar เฉพาะหน้า /games
  //     this.showNavbar = event.urlAfterRedirects !== '/login';
  //   });
  // }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoutes = ['/','/login', '/register'];
        this.showNavbar = !hiddenRoutes.includes(event.urlAfterRedirects);
      });
  }

  constructor(private router: Router) {}

  title = 'app';

}
