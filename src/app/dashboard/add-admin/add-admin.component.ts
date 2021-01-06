import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  loading = false;
  adminCreated = false;
  showInfo = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onAddAdmin(form) {
    let values = form.value;
    console.log(values);
    this.loading = true;
    let credentials = {
      ...values,
      passwordConfirm: values.confirmPassword,
      role: 'admin',
    };
    this.auth.createAdmin(credentials).subscribe(
      (response) => {
        console.log(response);
        this.loading = false;
        form.reset();
        this.showInfo = true;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  onClose() {
    this.showInfo = false;
  }
}
