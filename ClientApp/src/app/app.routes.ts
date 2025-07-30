import { Routes } from '@angular/router';
import { LoginComponent } from './views/pages/login/login.component';
import { WordScoreComponent } from './views/games/word-score/word-score.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthGuard } from './auth.guard';
import { RedirectGuard } from './redirect.guard';
import { NoAuthGuard } from './no-auth.guard';

export const routes: Routes = [
  //public pages
   { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  // { path: 'register', component: LoginComponent },

  //need token
  {
    path: 'games/word',
    component: WordScoreComponent,
    canActivate: [AuthGuard], // ✅ ตรวจสอบก่อนเข้า
  },

  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login' },

  // redict
  {
    path: '',
    component: RegisterComponent,
    canActivate: [RedirectGuard],
    pathMatch: 'full',
  },
  {
    path: '**',
    component: RegisterComponent,
    canActivate: [RedirectGuard],
  },

  // {
  //   path: 'games',
  //   loadChildren: () =>
  //     import('./games/games.module').then((m) => m.GamesModule)
  // },
  // {
  //   path: 'views',
  //   loadChildren: () =>
  //     import('./views/views.module').then((m) => m.ViewsModule)
  // },
  // { path: '', redirectTo: 'views/login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'views/login' }
];
