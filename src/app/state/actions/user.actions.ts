import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum UserActionTypes {
  LOAD_USERS = '[USER] Load Users',
  LOAD_USERS_SUCCESS = '[USER] Load Users Success',
  LOAD_USERS_FAILURE = '[USER] Load Users Failure',
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

export type UserAction =
  | LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersFailureAction;
