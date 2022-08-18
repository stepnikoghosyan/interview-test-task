import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { ProfileRoutingModule } from './profile-routing.module';
import { FileInputModule } from '../common/modules/file-input/file-input.module';

// components
import { ProfileComponent } from './components/profile/profile.component';
import { LoadersModule } from '../common/modules/loaders/loaders.module';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    FileInputModule,
    LoadersModule,
  ],
})
export class ProfileModule {
}
