import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/users/users.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { AppComponent } from './app.component';

import { MdButtonModule } from '@angular/material';
import { MdTableModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UsersComponent,
    UsersTableComponent
  ],
  imports: [
    MdButtonModule,
    MdTableModule,
    MdInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: '/main', pathMatch: 'full' },
        { path: 'main', component: MainComponent },
        { path: 'users', component: UsersComponent }
      ]
    )
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
