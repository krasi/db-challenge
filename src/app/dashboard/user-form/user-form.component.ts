import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { type User } from '../../types/User';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  department = new FormControl('', [Validators.required]);

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig<{ user: User }>,
  ) {
    if (this.config.data?.user) {
      this.name.setValue(this.config.data?.user.name);
      this.email.setValue(this.config.data?.user.email);
      this.title.setValue(this.config.data?.user.title);
      this.department.setValue(this.config.data?.user.department);
    }
  }

  save() {
    this.ref.close({
      action: this.config.data?.user ? 'updated' : 'added',
    });
  }
}
