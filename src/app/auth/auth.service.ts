import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { pluck, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string) {
    return this.http
      .post('https://waf-app.herokuapp.com/api/v1/users/login', {
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          console.log(response);
          this.handleAuth(
            response.data.user.email,
            response.data.user.name,
            response.token,
            response.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const user = new User(
      userData.email,
      userData.name,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (user.gettoken()) {
      this.user.next(user);
    }
  }

  logoutUser() {
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  handleAuth(email: string, name: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + new Date(expiresIn).getTime()
    );

    const user = new User(email, name, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  updateMe(patches) {
    return this.http
      .patch('https://waf-app.herokuapp.com/api/v1/users/updateMe', patches)
      .pipe(pluck('data', 'user'));
  }

  updatePassword(credentials) {
    return this.http.patch(
      'https://waf-app.herokuapp.com/api/v1/users/updatePassword',
      credentials
    );
  }

  createAdmin(credentials) {
    return this.http.post(
      'https://waf-app.herokuapp.com/api/v1/users',
      credentials
    );
  }
}
