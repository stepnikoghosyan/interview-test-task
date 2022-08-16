import { Component } from '@angular/core';

// services
import { FormsService } from './services/forms.service';

@Component({
  templateUrl: './client-form.component.html',
})
export class ClientFormComponent {
  constructor(private readonly formsService: FormsService) {
  }

  public handlePrevClick(): void {
    this.formsService.goToPrevStep();
  }

  public handleNextClick(): void {
    this.formsService.goToNextStep();
  }

  public get isFirstStep(): boolean {
    return this.formsService.isFirstStep;
  }

  public get isLastStep(): boolean {
    return this.formsService.isLastStep;
  }
}
