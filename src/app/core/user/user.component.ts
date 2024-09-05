import { Component, input } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';

import { type User } from '../../types/User';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user = input<User>();
}
