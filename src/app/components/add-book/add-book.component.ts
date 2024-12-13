
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/service/book.service'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  standalone: true,
  imports :[ ReactiveFormsModule]
})
export class AddBookComponent {
  addBookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.addBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publicationYear:['',Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addBookForm.valid) {
      this.bookService.addBook(this.addBookForm.value).subscribe(
        () => {
          this.router.navigate(['/list']);
        },
        (error) => {
          console.error('Error adding book', error);
        }
      );
    }
  }
}
