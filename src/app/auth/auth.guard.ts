import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../store/auth/auth.selectors';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
  ) {}

  canActivate() {
    return this.checkAuth();
  }

  private checkAuth(): Observable<boolean> {
    return this.store.select(selectAuthUser).pipe(
      map((user) => !!user),
      tap((auth) => {
        if (!auth) {
          this.router.navigate(['/']);
        }
      }),
    );
  }
}
