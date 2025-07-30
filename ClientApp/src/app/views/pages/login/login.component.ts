import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

  constructor() {}

  // valuable

  data: any = {};

  onSubmit() {
    console.log(this.data);

    sessionStorage.setItem('token','temp token')
  }
}
