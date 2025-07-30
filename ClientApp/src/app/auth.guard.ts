// // import { CanActivateFn } from '@angular/router';

// // export const authGuard: CanActivateFn = (route, state) => {
// //   return true;
// // };


// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const isLoggedIn = !!sessionStorage.getItem('token'); // หรือเช็คจาก authService

//     if (!isLoggedIn) {
//       this.router.navigate(['/login']); // ส่งไปหน้า login
//       return false;
//     }else{
//       this.router.navigate(['/register']); // ส่งไปหน้า login
//       return false;
//     }

//     return true;
//   }
// }


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');

    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
