import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiEndPoint: string = 'https://localhost:7125/api/';
  jwtHelper = new JwtHelperService(); // Instantiating JwtHelperService directly

  constructor(private http: HttpClient) {}

 // Register a new user
 registerUser(obj: any): Observable<any> {
  return this.http.post(this.apiEndPoint + 'Auth/register', obj); 
}

// Login user
login(obj: any) {
  return this.http.post(this.apiEndPoint + 'Auth/login', obj);
}

getBooks(): Observable<any[]> {
  return this.http.get<any[]>(this.apiEndPoint + 'Books')
}

getBook(isbn: string): Observable<any> {
  return this.http.get<any>(`${this.apiEndPoint}Books/${isbn}`);
}

addBook(book: any): Observable<any> {
  return this.http.post<any>(this.apiEndPoint+ 'Books',book);
}

updateBook(isbn: string, book: any): Observable<any> {
  return this.http.put<any>(`${this.apiEndPoint}Books/${isbn}`, book);
}

deleteBook(isbn: string): Observable<void> {
  return this.http.delete<void>(`${this.apiEndPoint}Books/${isbn}`);
}
   }

