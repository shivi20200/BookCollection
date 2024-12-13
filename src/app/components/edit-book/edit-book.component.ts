import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports :[ ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  editBookForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private fb: FormBuilder
  ) {
    this.editBookForm = this.fb.group({
      title: [''],
      author: [''],
      description: [''],
      publicationYear: [''], // Added field for publication year
    });
  }

  ngOnInit(): void {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    if (isbn) {
      this.bookService.getBook(isbn).subscribe((book: any) => {
        this.editBookForm.patchValue({
          title: book.title,
          author: book.author,
          description: book.description,
          publicationYear: book.publicationYear, // Populate publicationYear
        });
      });
    }
  }

  onSubmit(): void {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    if (isbn) {
      const updatedBook = {
        isbn,
        ...this.editBookForm.value, // Include all form values, including publicationYear
      };
      this.bookService.updateBook(isbn,updatedBook).subscribe(() => {
        this.router.navigate(['/list']);
      });
    }
  }
}
