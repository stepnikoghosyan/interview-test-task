import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
})
export class NavigationButtonsComponent {
  @Output() public onNavigation = new EventEmitter<'next' | 'prev'>();

  public handleNextClick(): void {
    this.onNavigation.emit('next');
  }

  public handlePrevClick(): void {
    this.onNavigation.emit('prev');
  }
}
