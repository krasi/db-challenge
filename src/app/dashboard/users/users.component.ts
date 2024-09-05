import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

import { type User } from '../../types/User';
import { UserComponent } from '../../core/user/user.component';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: User[] = [
    {
      id: 0,
      name: 'Krasimir Stavrev',
      email: 'krasimir@stavrev.dev',
      title: 'Senior Software Engineer',
      department: 'Technology',
    },
  ];

  selectedUsers: number[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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
        this.messageService.add({
          severity: 'contrast',
          summary: user
            ? `${user.name} removed`
            : `${this.selectedUsers.length} users removed`,
          life: 3000,
        });
      },
    });
  }
}
