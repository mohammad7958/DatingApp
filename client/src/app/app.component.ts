import { LowerCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Dating App';
  users: any;
  constructor( private accountService: AccountService) {}
  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const toParse: string = localStorage.getItem('user') || "";
    if(toParse === "")
    {
      this.accountService.setCurrentUser(undefined);
      console.log(undefined);
    }else{
      const user: User = JSON.parse(toParse);
      this.accountService.setCurrentUser(user);
    }
    
    
  }

}
