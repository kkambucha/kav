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
  selector: 'app-users-by-group',
  templateUrl: './users-by-group.component.html',
  styleUrls: ['./users-by-group.component.css']
})


export class UsersByGroupComponent implements OnInit {
  users: IUser[];
  groups;
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
        this.groups = this.getGroups(data);
        console.log(this.groups);
        this.filteredUsers = data;
      });
  }

  getGroups(arr: IUser[]): string[] {
    let newArr: string[] = [],
        i: number;

    for (i = 0; i < arr.length; i++) {
      if (arr[i].drugs) {
        newArr.push(arr[i].drugs);
      }
    }

    return Array.from(new Set(newArr));
  }

}
