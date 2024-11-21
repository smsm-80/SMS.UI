import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule


@Component({
  selector: 'app-system-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule], // Add RouterModule here
  templateUrl: './system-card.component.html',
  styleUrls: ['./system-card.component.css']
})
export class SystemCardComponent {
  @Input() systemName: string = '';
  @Input() description: string = '';
  @Input() icon: string = ''; 
  private _path: string = '';

  // Setter for the path
  @Input()
  set path(value: string) {
    // Remove '/Screens' if it exists in the path
    this._path = value ? value.replace('/Screens', '') : '/Main';
  }

  // Getter for the path
  get path(): string {
    return this._path;
  }
}
