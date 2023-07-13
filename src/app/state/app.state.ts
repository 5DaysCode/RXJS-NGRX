import { UserState } from './reducers/user.reducer'; // assuming the path

export interface AppState {
  user: UserState; // updated this line
  // other state properties
}
