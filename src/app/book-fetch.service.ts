import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookFetchService {

  constructor() { }

  private books:any[] = [];

  getFetchedBooks(){
    return this.books;
    
  }
  setFetchedBooks(fetchBooks: any[]){
    this.books = fetchBooks;
  }
}
