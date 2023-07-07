import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { LoadUsersAction } from '../../state/actions/user.actions';
import { User } from 'src/app/models/user.model';
import { AppState } from '../../state/app.state';
import * as fromUser from '../../state/selectors/user.selectors';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'User 1',
    email: 'user1@example.com',
    username: 'user1',
    password: 'pass1',
  },
  {
    id: 2,
    name: 'User 2',
    email: 'user2@example.com',
    username: 'user2',
    password: 'pass2',
  },
];

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: MockStore<AppState>;
  const initialState = { users: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    store.setState({ users: mockUsers });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the load users action on init', fakeAsync(() => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    tick();
    expect(dispatchSpy).toHaveBeenCalledWith(new LoadUsersAction());
  }));

  it('should select users state using selector', fakeAsync(() => {
    const selectSpy = jest.spyOn(fromUser, 'selectUsers');
    component.ngOnInit();
    tick();
    if (component.users$) {
      component.users$.toPromise().then((users) => {
        expect(selectSpy).toHaveBeenCalled();
        expect(users).toEqual(mockUsers);
      });
    }
  }));

  it('should have users observable', (done) => {
    component.users$?.subscribe((users) => {
      expect(users).toEqual(mockUsers);
      done();
    });
  });
});
