import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  standalone: true,

  templateUrl: './navbar.component.html',
  // styleUrl: './navbar.component.scss',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  Username: string = 'Unknown User';
  ngOnInit(): void {
    this.setUser();
  }
  constructor(private route: Router) {}

  setUser() {
    const data = sessionStorage.getItem('user');

    if (data !== null) {
      const parsed = JSON.parse(data);
      // this.Username = parsed.
      this.Username = parsed.user.username;
    } else {
      // กรณี data เป็น null (เช่น ไม่มี key ใน sessionStorage)
    }
  }
  onLogout() {
    sessionStorage.clear();
    return this.route.navigate(['/login']);
  }
}
