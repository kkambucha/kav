import { Component, OnInit } from '@angular/core';

import { IUser } from '../../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users: IUser[];
  title = 'Junkies List';

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe((data) => {
        this.users = data;
      });
  }
}
