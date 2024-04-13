import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { AdminUsersComponent } from '../admin-users/admin-users.component';
import { BookFetchService } from '../book-fetch.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  //hide section on btn click event
  currentSection:string = "";
  showSection(section:string){
    this.currentSection = section;
  }

  //retrive books and store them in books array
  books:any[] = [];
  editedBooks:any[] = [];
  editBookHidden:boolean[] = [];


  constructor(private bookService:BookService){}
  ngOnInit(): void{
    this.getBooks();
  }

  getBooks(){
    this.bookService.getBooks('adventure').subscribe(
      (response)=>{
        this.books = response.items.map((item:any) =>
        ({
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors?.[0] || 'Unknown',
          imageUrl: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'
        }))
        this.editedBooks = this.books.map(book => ({ ...book }));
        this.editBookHidden = new Array(this.books.length).fill(true);
        
      },
      (error) => {
        console.log('Error fetching books : ',error);
      }
    )
  }

  passBooks(){
    this.bookService.setFetchedBooks(this.books);
  }
   

  //delete book from books array
  deleteBook(book:any){
    const bookIndex = this.books.findIndex((q) => q.author === book.author && q.title === book.title);
    if(bookIndex != -1){
      this.books.splice(bookIndex, 1);
    }
  }

  //edit books details

  editBook(book:any, index:number){
    const editedBook = this.editedBooks[index];
    const bookIndex = this.books.findIndex(b => b.title === book.title && b.author === book.author);
    if(bookIndex !== -1 && editedBook){
      this.books[bookIndex].title = editedBook.title;
      this.books[bookIndex].author = editedBook.author;
      this.books[bookIndex].imageUrl = editedBook.imageUrl;
    }

  }

  //hide/unhide Edit books section
  
  unHideBookEdit(index: number){
    if(this.editBookHidden[index] == false){
      this.editBookHidden[index] = true;
    }else{
      this.editBookHidden[index] = false;
    }
  }


}
