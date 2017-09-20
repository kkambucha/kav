import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { IUser } from '../../../../interfaces/user';
import { UserService } from '../../../services/user.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.css']
})


export class UsersCardComponent implements OnInit {
  users: IUser[];

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsersSlowly().then(users => {
      this.users = users;
    });
  }

}
