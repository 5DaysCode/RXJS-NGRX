import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectUsers = createSelector(
  (state: AppState) => state.users,
  (users) => users
);
