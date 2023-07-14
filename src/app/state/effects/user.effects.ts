import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  UserAction,
  UserActionTypes,
  LoadUsersSuccessAction,
  LoadUsersFailureAction,
  LoadUserAction,
  LoadUserSuccessAction,
  LoadUserFailureAction,
  UpdateUserAction,
  UpdateUserSuccessAction,
  UpdateUserFailureAction,
} from '../actions/user.actions';
import { User } from 'src/app/models/user.model';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.LOAD_USERS),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => new LoadUsersSuccessAction(users)),
          catchError((error) => of(new LoadUsersFailureAction(error)))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.LOAD_USER),
      mergeMap((action: LoadUserAction) => {
        console.log('Action Payload:', action.payload);

        return this.userService.getUserById(action.payload.toString()).pipe(
          map((user) => {
            console.log('Received User:', user);
            return new LoadUserSuccessAction(user);
          }),
          catchError((error) => {
            console.log('Error:', error);
            return of(new LoadUserFailureAction(error));
          })
        );
      })
    )
  );

  UpdateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpdateUserAction>(UserActionTypes.UPDATE_USER),
      mergeMap((action) =>
        this.userService
          .updateUser({ id: action.payload.id, ...action.payload.changes })
          .pipe(
            map(
              (updatedUser: User) =>
                new UpdateUserSuccessAction({
                  id: updatedUser.id,
                  changes: action.payload.changes,
                })
            ),
            catchError((error) => of(new UpdateUserFailureAction(error)))
          )
      )
    )
  );

  constructor(private userService: UserService, private actions$: Actions) {}
}
