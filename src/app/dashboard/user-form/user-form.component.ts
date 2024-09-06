import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';

import { type User } from '../../types/User';
import { Store } from '@ngrx/store';
import { addUser, updateUser } from '../../store/user/user.actions';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputSwitchModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    admin: new FormControl(false),
  });

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig<{ user: User }>,
    private store: Store,
  ) {
    if (this.config.data?.user) {
      const { name, email, title, department, admin } = this.config.data.user;
      this.form.setValue({ name, email, title, department, admin: !!admin });
    }
  }

  save() {
    if (!this.form.valid) {
      Object.values(this.form.controls).forEach((control) =>
        control.markAsDirty(),
      );
      return;
    }
    if (this.config.data?.user) {
      this.store.dispatch(
        updateUser({
          update: {
            id: this.config.data?.user.id,
            changes: this.form.value as User,
          },
        }),
      );
      this.ref.close({
        action: 'updated',
      });
      return;
    }

    this.store.dispatch(addUser(this.form.value as User));
    this.ref.close({
      action: 'added',
    });
  }
}
