import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { UserToken } from '../../../auth/models/token-types.model';

import * as fromStore from '../../store';
import * as fromAuthStore from './../../../auth/store';
import * as fromRouting from '../../../routing/store';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user$: Observable<any>;
  isLogin = false;

  subscription: Subscription;

  constructor(
    private store: Store<fromStore.UserState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getDetails);
    this.subscription = this.store
      .select(fromAuthStore.getUserToken)
      .subscribe((token: UserToken) => {
        if (token && token.access_token && !this.isLogin) {
          this.isLogin = true;
          this.store.dispatch(new fromStore.LoadUserDetails(token.userId));
          this.store.dispatch(new fromAuthStore.Login());
        } else if (token && !token.access_token && this.isLogin) {
          this.isLogin = false;
        }
      });
  }

  logout() {
    this.isLogin = false;
    this.store.dispatch(new fromAuthStore.Logout());

    let state = this.route.snapshot;
    while (state.firstChild) {
      state = state.firstChild;
    }

    if (
      state.routeConfig.canActivate &&
      state.routeConfig.canActivate.find(
        child => child.GUARD_NAME === 'AuthGuard'
      )
    ) {
      this.store.dispatch(
        new fromRouting.Go({
          path: ['/login']
        })
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}