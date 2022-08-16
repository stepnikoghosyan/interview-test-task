import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCalendar, faSearch, faBan } from '@fortawesome/free-solid-svg-icons';

// modules
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { NotificationsModule } from './modules/common/modules/notifications/notifications.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    NotificationsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      autoDismiss: true,
      timeOut: 5000,
      extendedTimeOut: 1000,
      tapToDismiss: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch, faCalendar, faBan);
  }
}
