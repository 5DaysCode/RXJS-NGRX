import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectSources, EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/effects/user.effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { UserReducer } from './state/reducers/user.reducer';
import { AppState } from './state/app.state';
import { UserAction } from './state/actions/user.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponentComponent } from './components/user-edit-component/user-edit-component.component';

export const appReducers: ActionReducerMap<AppState, UserAction> = {
  users: UserReducer,
};

const routes: Routes = [];

@NgModule({
  declarations: [AppComponent, UserListComponent, UserEditComponentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UserEffects]),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
