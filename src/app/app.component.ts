import { Component } from '@angular/core';
import { SharedImports } from './shared/SharedImports';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: SharedImports,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
  ],
})
export class AppComponent {
  title = 'SMS.UI';
}













