import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { IUser } from '../../../../interfaces/user';
import { UserService } from '../../../services/user.service';

import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})


export class UsersTableComponent implements OnInit {
  displayedColumns = ['id', 'firstName', 'lastName', 'userName', 'email', 'gender', 'drugs'];
  dataSource: ExampleDataSource | null;
  userService: UserService = new UserService();
  exampleDatabase = new ExampleDatabase(this.userService);

  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.userService);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDatabase {
  dataChange: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  get data(): IUser[] { return this.dataChange.value; }

  constructor(userService: UserService) {
    userService
      .getUsers()
      .subscribe(data => {
        this.dataChange.next(data);
      });
  }
}

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(
    private _exampleDatabase: ExampleDatabase,
    private _userService: UserService) {
    super();
  }

  connect(): Observable<IUser[]> {
    const displayDataChanges = [
      this._userService.getUsers(),
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice().filter((item: IUser) => {
        let searchStr = (item.first_name + item.username).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() {}
}
