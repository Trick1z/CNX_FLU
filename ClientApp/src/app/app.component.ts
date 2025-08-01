// import { Component, OnInit } from '@angular/core';
// import { NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
// import { NavbarComponent } from './views/navbar/navbar.component';
// import { NgIf } from '@angular/common';
// import { filter } from 'rxjs';

// // import { filter } from 'rxjs/operators';



// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, NavbarComponent, NgIf],
//   templateUrl: './app.component.html',
//   // styleUrl: './app.component.scss',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit {

//   showNavbar: boolean = false;
//   // ngOnInit(): void {
//   //   this.router.events.pipe(
//   //     filter(event => event instanceof NavigationEnd)
//   //   ).subscribe((event: NavigationEnd) => {
//   //     // แสดง navbar เฉพาะหน้า /games
//   //     this.showNavbar = event.urlAfterRedirects !== '/login';
//   //   });
//   // }

//   ngOnInit() {
//     this.router.events
//       .pipe(filter(event => event instanceof NavigationEnd))
//       .subscribe((event: NavigationEnd) => {
//         const hiddenRoutes = ['/','/login', '/register'];
//         this.showNavbar = !hiddenRoutes.includes(event.urlAfterRedirects);
//       });
//   }

//   constructor(private router: Router) {}

//   title = 'app';

// }


// up for 19
// down for 16

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './views/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showNavbar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        const hiddenRoutes = ['/', '/login', '/register'];
        this.showNavbar = !hiddenRoutes.includes(event.urlAfterRedirects);
      });
  }
}
