import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectSources, EffectsModule, createEffect } from '@ngrx/effects';
import { UserEffects } from './state/effects/user.effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { UserReducer } from './state/reducers/user.reducer';
import { AppState } from './state/app.state';
import { UserAction } from './state/actions/user.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponentComponent } from './components/user-edit-component/user-edit-component.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../src/environments/environment';

export const appReducers: ActionReducerMap<AppState, UserAction> = {
  user: UserReducer, // changed this line
};

const routes: Routes = [];

@NgModule({
  declarations: [AppComponent, UserListComponent, UserEditComponentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }), // End StoreModule.forRoot
    EffectsModule.forRoot([UserEffects]),
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }), // Move this line outside of StoreModule.forRoot
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
