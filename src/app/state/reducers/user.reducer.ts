import { User } from '../../models/user.model';
import { UserActionTypes, UserAction } from '../actions/user.actions';

export const initialState: User[] = [];

export function UserReducer(
  state: User[] = initialState,
  action: UserAction
): User[] {
  switch (action.type) {
    case UserActionTypes.LOAD_USERS_SUCCESS:
      return action.payload;
    case UserActionTypes.LOAD_USERS_FAILURE:
      return state;
    default:
      return state;
  }
}
