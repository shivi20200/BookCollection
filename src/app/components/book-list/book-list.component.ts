

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
})
export class BookListComponent implements OnInit {
  books: Book[] = []; // Explicitly define the type of books array

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        console.log('API Response:', data); // Debug log to verify response
        this.books = data.map((book) => ({
          ...book,
          publicationYear: book.publicationYear || 'N/A', // Fallback if missing
        }));
      },
      (error) => {
        console.error('Error fetching books', error);
      }
    );
  }

  viewBook(isbn: string): void {
    this.router.navigate(['/books', isbn]);
  }

  editBook(isbn: string): void {
    this.router.navigate(['/edit', isbn]);
  }

  deleteBook(isbn: string): void {
    this.bookService.deleteBook(isbn).subscribe(
      () => {
        this.books = this.books.filter((book) => book.isbn !== isbn);
      },
      (error) => {
        console.error('Error deleting book', error);
      }
    );
  }
}

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number | string;
}


