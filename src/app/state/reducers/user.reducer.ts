import { User } from '../../models/user.model';
import { UserActionTypes, UserAction } from '../actions/user.actions';

export interface UserState {
  users: User[];
  currentUser: User | null;
}

export const initialState: UserState = {
  users: [],
  currentUser: null,
};

export function UserReducer(
  state: UserState = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case UserActionTypes.LOAD_USERS_SUCCESS:
      return { ...state, users: action.payload };
    case UserActionTypes.LOAD_USER:
      console.log('Load User action', action);
      return { ...state, currentUser: null };
    case UserActionTypes.LOAD_USER_SUCCESS:
      console.log('Load User Success action', action);
      const updatedState = { ...state, currentUser: action.payload };
      console.log('Updated State:', updatedState);
      return updatedState;
    case UserActionTypes.LOAD_USERS_FAILURE:
      return state;
    default:
      return state;
  }
}
