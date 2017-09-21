import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/users/users.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { UsersCardComponent } from './components/users/users-card/users-card.component';
import { AppComponent } from './app.component';

import { MdButtonModule, MdTableModule, MdInputModule, MdRadioModule, MdCardModule } from '@angular/material';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UsersComponent,
    UsersTableComponent,
    UsersCardComponent
  ],
  imports: [
    MdButtonModule,
    MdTableModule,
    MdInputModule,
    MdRadioModule,
    MdCardModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: '/main', pathMatch: 'full' },
        { path: 'main', component: MainComponent },
        {
          path: 'users',
          component: UsersComponent,
          children: [
            {
              path: 'table',
              component: UsersTableComponent,
            },
            {
              path: 'cards',
              component: UsersCardComponent,
            },
          ]
        }
      ]
    )
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
