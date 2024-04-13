import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Observable } from 'rxjs';
import { BookFetchService } from '../book-fetch.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  books: any[] = []
  constructor(private bookService:BookService){}

  ngOnInit(): void{
      this.getBooks();
  }

  getBooks(){
    this.books = this.bookService.getFetchedBooks();
  }

  
  //hide sections
  currentSection: string = 'booksAvailable';
  showSection(section:string){
    this.currentSection = section;
  }
}
