import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../../../services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  data: UserData = {};

  constructor(private api: ApiService,
    private nav : Router
  ) {}

  onSubmit() {
    // console.log(this.data);
    var ps_state = false;

    var submitData = this.data;
    if (submitData.password === submitData.c_password) {
      ps_state = true;
    }

    if (ps_state) {
      // this api
      var user = {
        username: this.data.username,
        password: this.data.password,
      };

      this.api.post('api/auth/register', this.data).subscribe({
        next: (res: any) => {
          // console.log(res);

          Swal.fire({
            position: 'center-end',
            icon: 'success',
            title: 'user Added SuccessFully ! ',
            showConfirmButton: false,
            timer: 1500,
          });

          // set temp token
          var new_str = JSON.stringify(res)

          sessionStorage.setItem('token' ,  'temp')
          sessionStorage.setItem('user' ,  new_str)

          return this.nav.navigateByUrl('/games/word')

        },
        error: (err) => {
          if (err.status === 409) {
            Swal.fire({
              title: 'ExistingUser',
              text: 'Username already exists',
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
    } else {
      Swal.fire({
        title: 'Password ไม่ตรงกัน',
        icon: 'error',
        draggable: true,
      });
    }

    return console.log(false);
  }
}

interface UserData {
  username?: string;
  password?: string;
  c_password?: string;
  isVip?: boolean;
}
