import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => (this.user = user));
  }

  onAddAdmin() {
    this.router.navigate(['add-admin']);
  }
}
