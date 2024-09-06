import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { first, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CardModule } from 'primeng/card';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { type User } from '../../types/User';
import { UserComponent } from '../../core/user/user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import {
  selectAllUsers,
  selectUserEntities,
} from '../../store/user/user.selectors';
import { logout } from '../../store/auth/auth.actions';
import { deleteUsers } from '../../store/user/user.actions';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    UserComponent,
    ConfirmPopupModule,
    ToastModule,
    AsyncPipe,
  ],
  providers: [ConfirmationService, MessageService, DialogService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  users$: Observable<User[]> = this.store.select(selectAllUsers);
  selectedUsers: number[] = [];
  ref: DynamicDialogRef | undefined;
  @ViewChild('table') table?: Table;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private store: Store,
    private router: Router,
  ) {}

  confirmRemove(event: Event, user?: User) {
    const message = user
      ? `Are you sure you want to remove ${user.name}`
      : `Are you sure you want to remove ${this.selectedUsers.length} users`;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message,
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        const users = user ? [user.id] : this.selectedUsers;

        if (!users.length) {
          return;
        }

        if (users.length > 1) {
          this.deselectAll();
        }

        this.store
          .select(selectUserEntities)
          .pipe(
            map((entities) =>
              Object.keys(entities).filter((key) => {
                const id = entities[key]?.id;
                return id && users.indexOf(id) > -1;
              }),
            ),
            first(),
          )
          .subscribe((ids) => {
            this.store.dispatch(deleteUsers({ ids }));
            this.messageService.add({
              severity: 'contrast',
              summary: user
                ? `${user.name} removed`
                : `${this.selectedUsers.length} users removed`,
              life: 3000,
            });
          });
      },
    });
  }

  openUserDialog(user?: User) {
    this.ref = this.dialogService.open(UserFormComponent, {
      header: user ? 'Edit an employee' : 'Add an employee',
      data: {
        user,
      },
    });

    this.ref.onClose.pipe(first()).subscribe((data) => {
      if (data?.action) {
        this.messageService.add({
          severity: 'contrast',
          summary: data?.action === 'added' ? 'User added' : 'User updated',
          life: 3000,
        });
      }
    });
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/']);
  }

  search($event: Event) {
    const string = ($event.target as HTMLInputElement).value;
    this.table?.filterGlobal(string, 'contains');
  }

  deselectAll() {
    this.selectedUsers = [];
  }
}
