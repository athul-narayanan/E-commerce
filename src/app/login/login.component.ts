import { Component, OnInit } from '@angular/core';


import {AuthServiceService} from '../shared/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private auth:AuthServiceService) {
    
   }

  ngOnInit(): void {
  }

  login(){
    this.auth.login();
  }

}
