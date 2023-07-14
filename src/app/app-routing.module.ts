import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponentComponent } from './components/user-edit-component/user-edit-component.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'user-edit', component: UserEditComponentComponent },
  { path: 'users/add', component: UserEditComponentComponent },
  { path: 'users/:id/edit', component: UserEditComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
