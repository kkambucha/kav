import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { IUser } from '../../../../interfaces/user';
import { UserService } from '../../../services/user.service';

import { Observable } from 'rxjs/Observable';
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
  filteredUsers: IUser[];
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        this.filteredUsers = this.users.filter((item: IUser) => {
          let filtered,
              isUsername,
              isFirstname;

          isUsername = item.username.toLowerCase().indexOf(this.filter.nativeElement.value.toLowerCase()) > -1;
          isFirstname = item.first_name.toLowerCase().indexOf(this.filter.nativeElement.value.toLowerCase()) > -1;

          filtered = isUsername || isFirstname;

          return filtered;
        });
      });
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe((data) => {
        this.users = data;
        this.filteredUsers = data;
      });
  }

}
