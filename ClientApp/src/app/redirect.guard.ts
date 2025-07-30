import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RedirectGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Promise<boolean> {
  const token = sessionStorage.getItem('token');
  // console.log('RedirectGuard: token=', token);

  return new Promise(resolve => {
    setTimeout(() => {
      if (token) {
        this.router.navigateByUrl('/register');
      } else {
        this.router.navigateByUrl('/login');
      }
      resolve(false);
    }, 0);
  });
}

}
