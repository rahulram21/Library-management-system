import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signUpUsers: any[] = [];
  signUpObj:any={
    username:'',
    email:'',
    password:'',
    isAdmin: false
  };
  loginObj:any={
    email:'',
    password:''
  };

  constructor(private router: Router){};

  ngOnInit(): void{
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null){
      this.signUpUsers = JSON.parse(localData);
    }
  }

  onSignUp(){
    this.signUpUsers.push(this.signUpObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signUpUsers));
    this.signUpObj={
      username:'',
      email:'',
      password:'',
      isAdmin: false
    };
  }
  onLogin(){
    const isUserExist = this.signUpUsers.find(m => m.email == this.loginObj.email && m.password == this.loginObj.password);
    if(isUserExist != undefined){
      //navigate to main page
      if(isUserExist.isAdmin == true){
        this.router.navigate(['adminPage'])
      }else if(isUserExist.isAdmin == false){
        this.router.navigate(['userPage'])
      }
    }else{
      alert("User doesn not exist");
    }
  }
}
