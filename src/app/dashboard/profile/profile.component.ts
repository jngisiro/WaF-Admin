import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user;
  canEdit = false;

  userName = '';
  userEmail = '';

  canUpdatePassword = false;
  loading = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.user = user;
      this.userName = user.name;
      this.userEmail = user.email;
    });
  }

  onAddAdmin() {
    this.router.navigate(['add-admin']);
  }

  onCanUpdatePassword() {
    this.canUpdatePassword = !this.canUpdatePassword;
  }

  onUpdateAdmin(values) {
    this.loading = true;
    // This Ugly
    // Check if user has not enabled password update. if true update only the user info
    if (!this.canUpdatePassword) {
      this.updateUser(values);
    } else {
      // User has enabled password update.. first submit the password patch, the on completion
      // submit user info patch
      let credentials = {
        currentPassword: values.currentPassword,
        password: values.newPassword,
        passwordConfirm: values.confirmPassword,
      };

      this.auth.updatePassword(credentials).subscribe(
        (response) => {
          console.log(response);
          let user = {
            name: values.name,
            email: values.email,
          };

          this.updateUser(user);
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    }
  }

  updateUser(values) {
    let user = {
      name: values.name,
      email: values.email,
    };

    this.auth.updateMe(user).subscribe(
      (user: User) => {
        this.loading = false;
        this.canEdit = false;
        this.auth.handleAuth(
          user.email,
          user.name,
          this.user._token,
          this.user._tokenExpirationDate
        );
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }
}
