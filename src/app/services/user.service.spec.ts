import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../models/user.model';
import {
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';

import stringContaining from 'expect';
import { Observable } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:55555/users';
  let windowAlertSpy: jest.SpyInstance<void, [string | undefined]>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    // Mock window.alert
    windowAlertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {}) as jest.SpyInstance<
      void,
      [string | undefined]
    >;
  });

  afterEach(() => {
    windowAlertSpy.mockRestore();
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers() should return users', () => {
    const dummyUsers: User[] = [
      {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        username: 'john123',
        password: 'pass1',
      },
      {
        id: 2,
        name: 'Doe',
        email: 'doe@example.com',
        username: 'doe123',
        password: 'pass2',
      },
    ];

    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('getUserById() should return a user by id', () => {
    const testUserId = 1;
    const dummyUser: User = {
      id: testUserId,
      name: 'John',
      email: 'john@example.com',
      username: 'john123',
      password: 'pass1',
    };

    service.getUserById(testUserId).subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/${testUserId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('createUser() should create a user', () => {
    const newUser: User = {
      id: 3,
      name: 'Jane',
      email: 'jane@example.com',
      username: 'jane123',
      password: 'pass3',
    };

    service.createUser(newUser).subscribe((user) => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should update a user successfully', () => {
    const updatedUser: User = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      username: 'john123',
      password: 'pass1',
    };

    service.updateUser(updatedUser).subscribe((response) => {
      expect(response).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/${updatedUser.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedUser);
  });

  it('should delete a user successfully', () => {
    const userId = '1';

    service.deleteUser(userId).subscribe((response) => {
      expect(response).toBeNull();
      // Additional expectations or assertions can be added here
    });

    const req = httpMock.expectOne(`${apiUrl}/${userId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });

  // Add more tests here
});
