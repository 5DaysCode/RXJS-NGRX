import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { User } from 'src/app/models/user.model';
import { UserState } from '../reducers/user.reducer';

export const selectUsers = createSelector(
  (state: AppState) => state.user.users,
  (users: User[]) => users
);
export const selectUserById = createSelector(
  (state: AppState) => state.user,
  (userState: UserState, props: { id: string }) => {
    console.log('User State:', userState);
    console.log('Props:', props);

    const user = userState.users.find(
      (user) => user.id.toString() === props.id
    );
    console.log('Selected User:', user);

    return user;
  }
);

export const selectCurrentUser = createSelector(
  (state: AppState) => state.user.currentUser,
  (currentUser) => currentUser
);
