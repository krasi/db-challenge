import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { selectRememberId } from '../../store/remember/remember.selectors';
import { LoginComponent } from '../login/login.component';
import { WelcomeBackComponent } from '../welcome-back/welcome-back.component';
import {
  selectAuthError,
  selectAuthLoading,
} from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    AsyncPipe,
    LoginComponent,
    WelcomeBackComponent,
    ToastModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, OnDestroy {
  remember$ = this.store.select(selectRememberId);
  loading$ = this.store.select(selectAuthLoading);

  private errorSubscription?: Subscription;

  constructor(
    private store: Store,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.errorSubscription = this.store
      .select(selectAuthError)
      .pipe(filter((err) => !!err))
      .subscribe((err) => {
        this.messageService.add({
          severity: 'error',
          summary: err || 'Something went wrong',
          life: 3000,
        });
      });
  }

  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
  }
}
