import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum UserActionTypes {
  LOAD_USERS = '[USER] Load Users',
  LOAD_USERS_SUCCESS = '[USER] Load Users Success',
  LOAD_USERS_FAILURE = '[USER] Load Users Failure',
  ADD_USER = '[USER] Add User',
  UPDATE_USER = '[USER] Update User',
  ADD_USER_SUCCESS = '[USER] Add User Success',
  ADD_USER_FAILURE = '[USER] Add User Failure',
  UPDATE_USER_SUCCESS = '[USER] Update User Success',
  UPDATE_USER_FAILURE = '[USER] Update User Failure',
  LOAD_USER = '[USER] Load User',
  LOAD_USER_SUCCESS = '[USER] Load User Success',
  LOAD_USER_FAILURE = '[USER] Load User Failure',
}

export class LoadUsersAction implements Action {
  readonly type = UserActionTypes.LOAD_USERS;
}

export class LoadUsersSuccessAction implements Action {
  readonly type = UserActionTypes.LOAD_USERS_SUCCESS;
  constructor(public payload: Array<User>) {}
}

export class LoadUsersFailureAction implements Action {
  readonly type = UserActionTypes.LOAD_USERS_FAILURE;
  constructor(public payload: Error) {}
}

export class AddUserAction implements Action {
  readonly type = UserActionTypes.ADD_USER;
  constructor(public payload: User) {}
}

export class UpdateUserAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER;
  constructor(public payload: { id: string; changes: Partial<User> }) {}
}

export class AddUserSuccessAction implements Action {
  readonly type = UserActionTypes.ADD_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class AddUserFailureAction implements Action {
  readonly type = UserActionTypes.ADD_USER_FAILURE;
  constructor(public payload: Error) {}
}

export class UpdateUserSuccessAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER_SUCCESS;
  constructor(public payload: { id: string; changes: Partial<User> }) {}
}

export class UpdateUserFailureAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER_FAILURE;
  constructor(public payload: Error) {}
}

export class LoadUserAction implements Action {
  readonly type = UserActionTypes.LOAD_USER;
  constructor(public payload: string) {}
}

export class LoadUserSuccessAction implements Action {
  readonly type = UserActionTypes.LOAD_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class LoadUserFailureAction implements Action {
  readonly type = UserActionTypes.LOAD_USER_FAILURE;
  constructor(public payload: Error) {}
}

export type UserAction =
  | LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersFailureAction
  | AddUserAction
  | UpdateUserAction
  | AddUserSuccessAction
  | AddUserFailureAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
  | LoadUserAction
  | LoadUserSuccessAction
  | LoadUserFailureAction;
