import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { UserEditComponentComponent } from './user-edit-component.component';
import { of } from 'rxjs';
import { AddUserAction } from '../../state/actions/user.actions';

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
});
