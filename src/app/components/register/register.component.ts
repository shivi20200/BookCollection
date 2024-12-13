import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http'; // Import HttpClientModule
import { inject } from '@angular/core';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userObj: any = {
       username: '',
        email: '',
        password:'',
   
      
         // Default role set to JobSeeker
  };


constructor(private bookService: BookService) {}

register() {
console.log('Request Payload:', this.userObj); // Log request payload
  
this.bookService.registerUser(this.userObj).subscribe(
  (res: any) => {
    console.log('API Response:', res); // Log API response
    if (res.message) {
      alert(res.message); // Display the success message from the API response
      console.log('User registered successfully:', res.message);
      this.resetForm(); // Reset the form after success
    } else {
      console.error('Unexpected API Response:', res);
      alert('Registration failed. Please try again.');
    }
  },
  (error) => {
    console.error('API Error:', error); // Log error details
    alert('An error occurred during registration. Please try again.');
  }
);

}



// Reset the form after successful registration
resetForm() {
      this.userObj = {
       username: '',
        email: '',
        password:'',
       
};
}
}





