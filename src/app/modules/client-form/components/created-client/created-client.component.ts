import { Component } from '@angular/core';

// services
import { FormsService } from '../../services/forms.service';

// models
import { IUserData } from '../../models/user-data.model';
import { ILabelValue } from '../../../common/models/label-value.model';
import { ProfileTabs } from '../../models/enums/profile-tabs.model';
import { ClientGroup, getClientGroupDisplayValues } from '../../models/enums/client-group.model';
import { getGenderDisplayValues } from '../../../common/models/enums/gender.model';
import { getDocumentTypeDisplayValues } from '../../models/enums/document-type.model';

// configs
import { getProfileTabsConfig } from '../../configs/profile-tabs.config';

@Component({
  selector: 'app-created-client',
  templateUrl: './created-client.component.html',
  styleUrls: ['./created-client.component.scss']
})
export class CreatedClientComponent {
  public userData: IUserData;

  public activeTab: ILabelValue<ProfileTabs>;
  public readonly tabsConfig = getProfileTabsConfig();

  public readonly PROFILE_TABS = ProfileTabs;

  public readonly genderDisplayValues = getGenderDisplayValues().mapping;
  public readonly documentTypeDisplayValues = getDocumentTypeDisplayValues().mapping;

  constructor(
    private readonly formsService: FormsService,
  ) {
    this.userData = this.formsService.formValues;
    this.activeTab = this.tabsConfig[0];
  }

  public clientGroupValuePrepare(data: ClientGroup[]): string {
    const mapping = getClientGroupDisplayValues().mapping;
    return data.map(item => mapping[item]).join(', ');
  }

  public handleTabClick(configItem: ILabelValue<ProfileTabs>): void {
    this.activeTab = configItem;
  }
}
