import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// services
import { UsersService } from '../../../common/services/users.service';
import { NotificationsService } from '../../../common/modules/notifications/services/notifications.service';

// models
import { IUserData } from '../../../client-form/models/user-data.model';
import { ILabelValue } from '../../../common/models/label-value.model';
import { ProfileTabs } from '../../../client-form/models/enums/profile-tabs.model';
import { ClientGroup, getClientGroupDisplayValues } from '../../../client-form/models/enums/client-group.model';
import { AppRoutes } from '../../../../models/enums/app-routes.model';
import { NotificationTypes } from '../../../common/modules/notifications/models/notification-types.model';

// configs
import { getProfileTabsConfig } from '../../configs/profile-tabs.config';
import { getFullRoute } from '../../../common/utils/get-full-route.helper';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public userData: IUserData;

  public isLoading = true;

  public activeTab: ILabelValue<ProfileTabs>;
  public readonly tabsConfig = getProfileTabsConfig();

  public readonly PROFILE_TABS = ProfileTabs;

  private readonly subscriptions$ = new Subject<void>();

  constructor(
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.activeTab = this.tabsConfig[0];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id || +id < 0) {
      this.router.navigate([getFullRoute(AppRoutes.ClientInfo)]);
      return;
    }

    this.getUserData(+id);
  }

  private getUserData(id: number): void {
    this.usersService.getUserById(id)
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (response) => {
          this.userData = response;
          this.isLoading = false;
        },
        error: () => {
          this.notificationsService.showNotification({
            type: NotificationTypes.ERROR,
            title: 'Failure',
            message: 'Could not find user',
          });

          this.router.navigate([getFullRoute(AppRoutes.ClientInfo)]);
        },
      });
  }

  public clientGroupValuePrepare(data: ClientGroup[]): string {
    const mapping = getClientGroupDisplayValues().mapping;
    return data.map(item => mapping[item]).join(', ');
  }

  public handleTabClick(configItem: ILabelValue<ProfileTabs>): void {
    this.activeTab = configItem;
  }

  ngOnDestroy(): void {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
