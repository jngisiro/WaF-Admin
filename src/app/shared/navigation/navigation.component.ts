import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  user;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => (this.user = user));
  }

  onLogOut() {
    this.auth.logoutUser();

    if (!this.user) {
      this.router.navigate(['auth']);
    }
  }
}
