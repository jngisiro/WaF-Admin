import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user;
  loading = false;
  error = '';
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.user = user;
      if (user) {
        this.router.navigate(['']);
      }
    });
  }

  onLogin(credentials) {
    this.loading = true;
    this.auth.loginUser(credentials.email, credentials.password).subscribe(
      (response) => {
        this.loading = false;
        // this.router.navigate(['/']);
      },
      (error) => {
        this.loading = false;
        this.error = error.error.error;
      }
    );
    // this.router.navigate(['/']);
    // console.log(credentials);
  }
}
