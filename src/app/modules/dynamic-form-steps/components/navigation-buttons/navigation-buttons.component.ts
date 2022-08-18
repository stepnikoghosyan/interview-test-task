import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

// services
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
})
export class NavigationButtonsComponent implements OnInit, OnDestroy {
  @Output() public onNavigation = new EventEmitter<'next' | 'prev'>();

  public isFirstStep = false;
  public isLastStep = false;

  private subscription: Subscription;

  constructor(
    private readonly formsService: FormsService,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.formsService.currentStepData$
      .subscribe({
        next: () => {
          this.isFirstStep = this.formsService.isFirstStep();
          console.log(this.isFirstStep);
          this.isLastStep = this.formsService.isLastStep();
        },
      });
  }

  public handleNextClick(): void {
    this.onNavigation.emit('next');
  }

  public handlePrevClick(): void {
    this.onNavigation.emit('prev');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
