import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'outline' = 'primary';
  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}
