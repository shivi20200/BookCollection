import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any = {
    username: "",
    password: ""
  };

  constructor(private jobSrv: BookService, private router: Router) {}

  onLogin() {
    this.jobSrv.login(this.loginObj).subscribe(
      (res: any) => {
        if (res.token) {
          alert('User Logged in Successfully!');
          // localStorage.setItem('authToken', res.token); // Store the token in localStorage
          this.router.navigateByUrl('/#'); // Navigate to home page
        } else {
          alert('Login failed. Please try again.');
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert('An error occurred during login. Please check your credentials and try again.');
      }
    );
  }
}
