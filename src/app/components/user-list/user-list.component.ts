// src/app/components/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadUsersAction } from '../../state/actions/user.actions';
import { User } from '../../models/user.model';
import { AppState } from '../../state/app.state';
import { selectUsers } from '../../state/selectors/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> | undefined;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    console.log('OnInit');
    this.store.dispatch(new LoadUsersAction());
    this.users$ = this.store.pipe(select(selectUsers));
  }
}
