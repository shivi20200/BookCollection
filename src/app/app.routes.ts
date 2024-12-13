
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
// import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'list', component: BookListComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'books/:isbn', component: BookDetailsComponent },
    { path: 'add', component: AddBookComponent },
    { path: 'edit/:isbn', component: EditBookComponent },
];




// canActivate: [AuthGuard] 