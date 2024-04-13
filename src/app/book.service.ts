import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = 'AIzaSyDhBRBX5IaDm1nXMTIKonK9shcSV47s9lI'; // Replace with your actual API key
  public fetechedBooks:any[] = [];

  constructor(private http: HttpClient) { }

  getBooks(query: string) {
    let params = new HttpParams().set('q', query).set('maxResults', '20').set('key', this.apiKey);
    return this.http.get<any>(`${this.apiUrl}`, { params });
  }

  getFetchedBooks(){
    return this.fetechedBooks;
    
  }
  setFetchedBooks(fetchBooks: any[]){
    this.fetechedBooks = fetchBooks;
  }
}
