import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Authservice/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;

  constructor(private authservice : AuthServiceService,
    private fb : FormBuilder, private router : Router){}


  ngOnInit(): void {
    this.initializeForm();
  }


  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }





  login(){

    if(this.loginForm.valid){
      this.authservice.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('login successful', response);
          this.router.navigate(["/home"]);
        },
        error: (error) => {
          console.error('login failed', error)
        }
      })
    }

  }

}
