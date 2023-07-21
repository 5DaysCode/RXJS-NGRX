import { User } from '../../models/user.model';
import { UserActionTypes, UserAction } from '../actions/user.actions';

export interface UserState {
  users: User[];
  currentUser: User | null;
  updateUserSuccess: boolean;
  updateUserFailure: Error | null;
  addUserFailure: Error | null;
  deleteUserSuccess: boolean; // Add this
  deleteUserFailure: Error | null; // Add this
  loading: boolean; // Add this
}

export const initialState: UserState = {
  users: [],
  currentUser: null,
  updateUserSuccess: false,
  updateUserFailure: null,
  addUserFailure: null,
  deleteUserSuccess: false, // And this
  deleteUserFailure: null, // And this
  loading: false, // And this
};

export function UserReducer(
  state: UserState = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case UserActionTypes.LOAD_USERS_SUCCESS:
      return { ...state, users: action.payload };
    case UserActionTypes.LOAD_USER:
      return { ...state, currentUser: null };
    case UserActionTypes.LOAD_USER_SUCCESS:
      return { ...state, currentUser: action.payload };
    case UserActionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        addUserFailure: null,
      };
    case UserActionTypes.ADD_USER_FAILURE:
      return {
        ...state,
        addUserFailure: action.payload,
      };
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, ...action.payload.changes }
            : user
        ),
        updateUserSuccess: true,
        updateUserFailure: null,
      };
    case UserActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        updateUserSuccess: false,
        updateUserFailure: action.payload,
      };
    case UserActionTypes.LOAD_USERS_FAILURE:
      return { ...state, users: [], currentUser: null };
    case UserActionTypes.DELETE_USER:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        loading: false,
        deleteUserSuccess: true,
        deleteUserFailure: null,
      };
    case UserActionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        deleteUserSuccess: false,
        deleteUserFailure: action.payload,
      };
    default:
      return state;
  }
}
