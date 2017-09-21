import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private router: Router;

  constructor (r: Router) {
    this.router = r;
  }

  onUsersLinkClick(): void {
    console.log('click');
    this.router.navigate(['/users/table']);
  }
}
