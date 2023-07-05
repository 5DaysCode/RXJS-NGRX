// UserListComponent.spec.ts

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { LoadUsersAction } from '../../state/actions/user.actions';
import { User } from 'src/app/models/user.model';

// Here is where you should declare your mockUsers
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
  let spy: any;
  const initialState = { users: [] }; // Initialize to the state shape your app uses

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

    store = TestBed.inject(MockStore);
    spy = jest.spyOn(store, 'dispatch').mockImplementation(() => {});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore); // Inject the mock store
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the load users action on init', () => {
    fixture.detectChanges();
    store.dispatch(new LoadUsersAction());
    expect(spy).toHaveBeenCalledWith(new LoadUsersAction());
  });

  it('should have users observable', (done) => {
    //mocking the store to return  predifined  users
    store.setState({ users: mockUsers });

    //detect changes when  oninit is triggered
    fixture.detectChanges();

    component.users$?.subscribe((users) => {
      expect(users).toEqual(mockUsers);
      done();
    });
  });
});
