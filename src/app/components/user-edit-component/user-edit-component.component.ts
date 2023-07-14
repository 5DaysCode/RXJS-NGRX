import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LoadUserAction,
  UpdateUserAction,
} from '../../state/actions/user.actions';
import { AppState } from '../../state/app.state';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import {
  selectCurrentUser,
  selectUpdateUserSuccess,
  selectUpdateUserFailure,
} from '../../state/selectors/user.selectors';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-edit-component',
  templateUrl: './user-edit-component.component.html',
  styleUrls: ['./user-edit-component.component.scss'],
})
export class UserEditComponentComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  private ngUnsubscribe = new Subject();
  private userId: string | undefined; // Add this variable to store the user ID

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      // ...other controls...
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      if (this.userId) {
        this.store.dispatch(new LoadUserAction(this.userId));

        this.store
          .pipe(select(selectCurrentUser), takeUntil(this.ngUnsubscribe))
          .subscribe((user: unknown) => {
            const typedUser = user as User | null;
            console.log('USER from component', typedUser);
            if (typedUser) {
              this.userForm.patchValue(typedUser);
            }
          });

        this.store
          .pipe(select(selectUpdateUserSuccess), takeUntil(this.ngUnsubscribe))
          .subscribe((success: boolean) => {
            if (success) {
              console.log('Update successful');
              // Handle update success, maybe redirect or show a success message
            }
          });

        this.store
          .pipe(select(selectUpdateUserFailure), takeUntil(this.ngUnsubscribe))
          .subscribe((error: Error | null) => {
            if (error) {
              console.log('Update failed', error);
              // Handle update failure, show an error message
            }
          });
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid && this.userId) {
      const changes = this.userForm.value;
      this.store.dispatch(new UpdateUserAction({ id: this.userId, changes }));
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.complete();
  }
}
