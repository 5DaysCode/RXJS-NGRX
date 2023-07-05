// src/app/state/app.state.ts
import { User } from '../models/user.model';

export interface AppState {
  readonly users: User[];
}
