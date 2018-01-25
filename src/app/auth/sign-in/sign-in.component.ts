import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { UserService } from '../../_services/user.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private userService: UserService, 
    public fb: FormBuilder, 
    public router: Router,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  signInWithEmailAndPassword() {
    if (this.signInForm.invalid) {
      alert("Correct your formular");
      return false;
    }
    console.debug("signInWithEmailAndPassword - email: " + this.signInForm.value.email );
    this.userService.signin(this.signInForm.value.email, this.signInForm.value.password)
    .then(success=>{
      console.log('signin success '+success);
      if(success){
        this.router.navigate(['/profile']);
      } else {
        this.toastrService.error('Wrong email or password', 'Access denied');
      }
    })
    .catch(error=>{
      this.toastrService.error('An unexpected error occurred', 'Error');
    })
  }

}
