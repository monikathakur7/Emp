import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from "@angular/forms";
import { LoginService } from '../service/login.service';
import { Globals } from '../globals/config/www.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  preserveWhitespaces: false
})
export class LoginComponent implements OnInit {
  public showblock: boolean = true;

  constructor(private router: Router, private formbuilder: FormBuilder,
    private loginService: LoginService, private globals: Globals) { }

  loginForm;
  message;
  navdiv;
  userName;
  password;

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: [
        "",
        [Validators.required]
      ],
      password: ["", [Validators.required]]
    });

    this.navdiv = document.getElementById("navbar");
    /** header hide **/
    if (this.showblock) {
      this.navdiv.style.display = "none";
    }

  }

  login(): void {

    this.userName = this.loginForm.get('email').value;
    this.password = this.loginForm.get('password').value;
    sessionStorage.setItem("userName", this.userName);

    let data = {
      "email": this.userName,
      "password": this.password
    }
    
    this.loginService.login(data).subscribe(res => {
        if(res){
          this.router.navigate(["employee"]);
        }
        else{
          alert("Enter valid details");
        }
    },
    err=>{
     
    });

    this.navdiv.style.display = "block";

  }

}

