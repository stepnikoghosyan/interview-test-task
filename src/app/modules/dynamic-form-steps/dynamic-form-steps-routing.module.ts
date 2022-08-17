import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { DynamicFormStepsComponent } from './dynamic-form-steps.component';

const routes: Routes = [
  {
    path: ':formStepId',
    component: DynamicFormStepsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicFormStepsRoutingModule {
}
