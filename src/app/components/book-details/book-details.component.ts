
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  imports: [CommonModule],
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null; // Use a defined interface for better type safety
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    if (isbn) {
      this.bookService.getBook(isbn).subscribe(
        (data) => {
          this.book = data;
        },
        (error) => {
          console.error('Error fetching book details:', error);
          this.errorMessage = 'Failed to load book details. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'No ISBN provided in route.';
    }
  }
}

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number | string;
}

