import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

import { UserComponent } from '../../core/user/user.component';
import { type User } from '../../types/User';

@Component({
  selector: 'app-welcome-back',
  standalone: true,
  imports: [CardModule, ButtonModule, AvatarModule, UserComponent],
  templateUrl: './welcome-back.component.html',
  styleUrl: './welcome-back.component.scss',
})
export class WelcomeBackComponent {
  user: User = {
    id: 0,
    name: 'Krasimir Stavrev',
    email: 'krasimir@stavrev.dev',
    title: 'Senior Software Engineer',
    department: 'Technology',
  };
}
