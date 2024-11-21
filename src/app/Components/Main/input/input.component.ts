import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string | number = ''; // Can accept string or number
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  @Output() valueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

  private onChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    if (!this.placeholder && this.label) {
      this.placeholder = this.label;
    }
  }

  writeValue(value: string | number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(value: string): void {
    let convertedValue: string | number = value;

    // If the input type is 'number', attempt to convert the value to a number
    if (this.type === 'number') {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        convertedValue = parsedValue;
      }
    }

    this.value = convertedValue;
    this.onChange(convertedValue); // Update form model
    this.onTouched(); // Mark as touched
    this.valueChange.emit(convertedValue);
  }
}
