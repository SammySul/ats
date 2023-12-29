import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  template: ` <router-outlet></router-outlet> `,

  imports: [RouterOutlet],
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    chrome.runtime.connect({ name: 'popup' });
  }
}
