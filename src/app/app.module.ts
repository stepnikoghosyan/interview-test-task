import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCalendar, faSearch, faBan } from '@fortawesome/free-solid-svg-icons';

// modules
import { AppRoutingModule } from './app-routing.module';
import { NotificationsModule } from './modules/common/modules/notifications/notifications.module';
import { CustomSelectModule } from './modules/common/modules/custom-select/custom-select.module';

// components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    CustomSelectModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch, faCalendar, faBan);
  }
}
