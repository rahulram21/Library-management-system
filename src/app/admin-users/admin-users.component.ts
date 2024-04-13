import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {

  users:any[] =[];
  editedUsers: any[] = [];
  editIsHidden: boolean [] = [];

  
  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    if(localStorage.getItem('signUpUsers')){
      this.users = JSON.parse(localStorage.getItem('signUpUsers') || '[]');
      this.editedUsers = this.users.map(user => ({ ...user }));
      this.editIsHidden = new Array(this.users.length).fill(true);
    }
  }

  unHideEdit(index: number) {
    if(this.editIsHidden[index] == false){
      this.editIsHidden[index] = true;
    }else{
      this.editIsHidden[index] = false;
    }
  }

  deleteUser(user:any){
    let signUpUsers:any[] = [];
    if(localStorage.getItem('signUpUsers')){
      signUpUsers = JSON.parse(localStorage.getItem('signUpUsers') || '[]');
      const index = signUpUsers.findIndex((u)=> u.email === user.email);
      if(index !== -1){
        signUpUsers.splice(index, 1);
        localStorage.setItem('signUpUsers', JSON.stringify(signUpUsers));
        this.users = signUpUsers;
      }
    }
  }

  
  editUser(user: any, index: number) {
    const editedUser = this.editedUsers[index];
    const signUpUsers = JSON.parse(localStorage.getItem('signUpUsers') || '[]');
    const userIndex = signUpUsers.findIndex((q:any)=> q.email === user.email);
    if (userIndex !== -1) {
      signUpUsers[userIndex].username = editedUser.username;
      signUpUsers[userIndex].email = editedUser.email;
      signUpUsers[userIndex].permittedBooks = editedUser.permittedBooks;
      localStorage.setItem('signUpUsers', JSON.stringify(signUpUsers));
      this.users[index] = { ...editedUser }; // Update users array with edited user
    }
  }
  
  }


