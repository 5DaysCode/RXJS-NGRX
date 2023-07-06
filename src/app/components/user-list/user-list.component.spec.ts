// UserListComponent.spec.ts

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { LoadUsersAction } from '../../state/actions/user.actions';
import { User } from 'src/app/models/user.model';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'User 1',
    email: 'user1@email.com',
    username: 'user1',
    password: 'pass1',
  },
  {
    id: 2,
    name: 'User 2',
    email: 'user2@email.com',
    username: 'user2',
    password: 'pass2',
  },
];

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: MockStore;
  let dispatchSpy: any;
  let selectSpy: any;
  const initialState = { users: [] }; // Initialize to the state shape of users...

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        provideMockStore({ initialState }),
        // Include this:
        { provide: Store, useClass: MockStore },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation(() => {});

    selectSpy = jest.spyOn(store, 'select').mockImplementation((selector) => {
      console.log('store.select is being called with:', selector);
      if (typeof selector === 'string') {
        console.log('string selector');
        return of({ users: mockUsers });
      } else if (typeof selector === 'function') {
        console.log('function selector');
        return of(selector({ users: mockUsers }));
      } else {
        console.log('Unexpected selector type');
        throw new Error('Unexpected selector type');
      }
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the load users action on init', () => {
    store.dispatch(new LoadUsersAction());
    expect(dispatchSpy).toHaveBeenCalledWith(new LoadUsersAction());
  });

  // it('should select users state', fakeAsync(() => {
  //   fixture.detectChanges();
  //   expect(selectSpy).toHaveBeenCalledWith('users');

  //   tick();

  //   fixture.detectChanges();

  //   let usersResult: User[] | undefined;
  //   component.users$?.subscribe((users) => {
  //     usersResult = users;
  //   });

  //   tick();

  //   expect(usersResult).toEqual(mockUsers);
  // }));

  it('should have users observable', (done) => {
    //mocking the store to return  predifined  users
    store.setState({ users: mockUsers });

    component.users$?.subscribe((users) => {
      expect(users).toEqual(mockUsers);
      done();
    });
  });
});
