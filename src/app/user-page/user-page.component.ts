import { Component } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  currentSection: string = 'booksAvailable';

  showSection(section:string){
    this.currentSection = section;
  }
}
