import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-welcome-back',
  standalone: true,
  imports: [CardModule, ButtonModule, AvatarModule],
  templateUrl: './welcome-back.component.html',
  styleUrl: './welcome-back.component.scss',
})
export class WelcomeBackComponent {}
