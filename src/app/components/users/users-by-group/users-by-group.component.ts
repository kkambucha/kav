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
  usersByGroups;
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
        let i;
        let filtered,
            isUsername,
            isFirstname;

        for (const group in this.usersByGroups ) {
          for (i = 0; i < this.usersByGroups[group].length; i++) {
            this.filteredUsers[group] = this.usersByGroups[group].filter((user) => {
              isUsername = user.username.toLowerCase().indexOf(this.filter.nativeElement.value.toLowerCase()) > -1;
              isFirstname = user.first_name.toLowerCase().indexOf(this.filter.nativeElement.value.toLowerCase()) > -1;
              filtered = isUsername || isFirstname;
              return filtered;
            });
          }
        }
      });
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe((data) => {
        this.users = data;
        this.groups = this.getGroups(data);
        this.usersByGroups = this.getUsersByGroups();
        this.filteredUsers = this.getUsersByGroups();
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

  getUsersByGroups(): any {
    let newArr = [],
        i,
        j;

    for (i = 0; i < this.groups.length; i++) {
      newArr[this.groups[i]] = [];
      for (j = 0; j < this.users.length; j++) {
        if (this.users[j].drugs === this.groups[i]) {
          newArr[this.groups[i]].push(this.users[j]);
        }
      }
    }

    return newArr;
  }

  compareValues (key, order = 'asc') {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }
}
