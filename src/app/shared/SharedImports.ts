// app-imports.ts
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InputComponent } from '../Components/Main/input/input.component';
import { LoginComponent } from '../Screens/Auth/login/login.component';
import { MainDashboardComponent } from '../Screens/Main/main-dashboard.component';
import { MatInputModule } from '@angular/material/input';

// Group your imports
export const SharedImports = [
  RouterOutlet,
  InputComponent,
  LoginComponent,
  MainDashboardComponent,
  MatSlideToggleModule,
  MatInputModule
];
