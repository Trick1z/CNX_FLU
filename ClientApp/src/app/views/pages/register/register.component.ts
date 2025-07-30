import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  data: UserData = {};

  onSubmit() {
    // console.log(this.data);

    var submitData = this.data;

    if (submitData.password === submitData.c_password) {
      console.log(true);
      return;
    }

    return console.log(false);
  }
}

interface UserData {
  username?: string;
  password?: string;
  c_password?: string;
}
