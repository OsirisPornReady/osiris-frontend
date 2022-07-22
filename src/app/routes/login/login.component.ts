import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }

  login() {

  }

}
