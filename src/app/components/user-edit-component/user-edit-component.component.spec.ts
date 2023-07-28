import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { UserEditComponentComponent } from './user-edit-component.component';
import { of } from 'rxjs';
import {
  AddUserAction,
  DeleteUserAction,
  UpdateUserAction,
} from '../../state/actions/user.actions';
import { selectCurrentUser } from '../../state/selectors/user.selectors';

describe('UserEditComponentComponent', () => {
  let component: UserEditComponentComponent;
  let fixture: ComponentFixture<UserEditComponentComponent>;
  let store: MockStore;

  // Your initial state
  const initialState = {
    users: [],
    currentUser: null,
    updateUserSuccess: false,
    updateUserFailure: null,
    addUserFailure: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [UserEditComponentComponent],
      providers: [
        FormBuilder,
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'testId' }),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    // Mock window.alert
    window.alert = jest.fn();
    fixture = TestBed.createComponent(UserEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.userForm.get('name')).not.toBeNull();
    expect(component.userForm.get('email')).not.toBeNull();
    expect(component.userForm.get('username')).not.toBeNull();
  });

  it('should validate the name control as required', () => {
    let control = component.userForm.get('name');
    control?.setValue('');

    expect(control?.valid).toBeFalsy();

    control?.setValue('Erwin');
    expect(control?.valid).toBeTruthy();
  });

  it('should validate the email control as required', () => {
    let control = component.userForm.get('email');

    control?.setValue('');

    expect(control?.valid).toBeFalsy();

    control?.setValue('erwin@erwinsdomain.com');
    expect(control?.valid).toBeTruthy();
  });

  it('should validate the username control as required', () => {
    let control = component.userForm.get('username');

    control?.setValue('');

    expect(control?.valid).toBeFalsy();

    control?.setValue('john');
    expect(control?.valid).toBeTruthy();
  });

  it('should validate the email control for correct format', () => {
    let control = component.userForm.get('email');

    control?.setValue('notAnEmail');

    expect(control?.valid).toBeFalsy();

    control?.setValue('alem@example.com');
    expect(control?.valid).toBeTruthy();
  });

  it('should dispatch AddUserAction or UpdateUserAction on form submit', () => {
    // Spy on the store's dispatch method
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Case when adding a new user
    component.isEditMode = false;
    const newUser = {
      name: 'Erwin Bristric',
      email: 'erwin@erwindomain.com',
      username: 'erwin',
    };
    component.userForm.patchValue(newUser);
    component.onSubmit();
    expect(dispatchSpy).toHaveBeenCalledWith(new AddUserAction(newUser));
    dispatchSpy.mockClear();

    //Case when editing /updating the user
    component.isEditMode = true; // now we are in editing mode
    component.userId = '1'; // setting userId for update

    expect(component.isEditMode).toBeTruthy();
    expect(component.userId).toEqual('1');

    const existingUser = {
      name: 'Elma Bristric',
      email: 'elma@elmasdomain.com',
      username: 'elma',
    };

    const updateUser = {
      id: '1',
      changes: existingUser,
    };

    component.userForm.patchValue(existingUser);
    component.onSubmit();
    expect(dispatchSpy).toHaveBeenCalledWith(new UpdateUserAction(updateUser));
  });

  it('should populate form if user load is successful', () => {
    const user = {
      id: '1',
      name: 'Elma Bristric',
      username: 'elma',
      email: 'elma@elmasdomain.com',
      password: 'password',
    };

    store.overrideSelector(selectCurrentUser, user);
    store.refreshState();

    component.ngOnInit();

    expect(component.userForm.controls['name'].value).toEqual(user.name);
    expect(component.userForm.controls['email'].value).toEqual(user.email);
    expect(component.userForm.controls['username'].value).toEqual(
      user.username
    );
  });

  it('should dispatch DeleteUserAction on delete', () => {
    //Spy on the store's dispatch method

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.userId = '1';
    component.onDelete();
    expect(dispatchSpy).toHaveBeenCalledWith(new DeleteUserAction('1'));
  });
});
