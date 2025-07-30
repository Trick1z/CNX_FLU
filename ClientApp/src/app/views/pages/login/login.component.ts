import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private api: ApiService, private nav: Router) {}

  // valuable

  data: any = {};

  onSubmit() {
    this.api.post('api/auth/login', this.data).subscribe({
      next: (res: any) => {
        console.log(res);

        var str_res = JSON.stringify(res)

        sessionStorage.setItem('token', 'true');
        sessionStorage.setItem('user', str_res );

        Swal.fire({
          position: 'center-end',
          icon: 'success',
          title: 'Login SuccessFully ! ',
          showConfirmButton: false,
          timer: 1500,
        });

        return this.nav.navigateByUrl('/games/word');
      },
      error: (err) => {
        if (err.status === 401) {
          Swal.fire({
            title: 'Unauthorized',
            text: 'Invalid username or password',
            icon: 'error',
            draggable: true,
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong',
            icon: 'error',
            draggable: true,
          });
        }
      },
    });
  }
}
