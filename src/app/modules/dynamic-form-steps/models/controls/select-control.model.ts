import { ValidatorFn } from '@angular/forms';

// models
import { IControlBase } from './control-base.model';
import { ControlTypes } from '../control-types.model';
import { SelectedValueSingle } from '../../../common/modules/custom-select/models/selected-value-single.model';
import { SelectedValueMulti } from '../../../common/modules/custom-select/models/selected-value-multi.model';
import { ILabelValue } from '../../../common/models/label-value.model';

export class SelectControl<ItemType> implements IControlBase<SelectedValueSingle | SelectedValueMulti> {
  controlType = ControlTypes.Select;
  name: string;
  label: string;
  defaultValue: SelectedValueSingle | SelectedValueMulti;
  isMultiSelect: boolean;
  hasDynamicData: boolean;
  validators: ValidatorFn | ValidatorFn[] | null;
  items?: ILabelValue<ItemType>[];

  constructor(
    name: string,
    label: string,
    items?: ILabelValue<ItemType>[],
    isMultiSelect: boolean = false,
    hasDynamicData: boolean = false,
    validators: ValidatorFn | ValidatorFn[] | null = [],
    defaultValue?: SelectedValueSingle | SelectedValueMulti,
  ) {
    this.name = name;
    this.label = label;
    this.isMultiSelect = isMultiSelect;
    this.hasDynamicData = hasDynamicData;
    this.defaultValue = defaultValue || (isMultiSelect ? [] : undefined);
    this.validators = validators;
    this.items = items;
  }
}

export class StaticSelectControl<T> extends SelectControl<any> {
  constructor(
    name: string,
    label: string,
    items?: ILabelValue<T>[],
    isMultiSelect: boolean = false,
    defaultValue: SelectedValueSingle | SelectedValueMulti = null,
    validators: ValidatorFn | ValidatorFn[] | null = [],
  ) {
    super(
      name,
      label,
      items,
      isMultiSelect,
      false,
      validators,
      defaultValue,
    );
  }
}

export interface IRequestData<ListItemType, ResponseType, PostBodyType = any> {
  endpoint: string;
  method: 'GET' | 'POST';
  postBody?: any;
  queryParams?: any;
  dataNormalizerFn: (response: ResponseType) => Array<ILabelValue<ListItemType>>;
  getPostBody?: (dependantControlValues: SelectedValueSingle | SelectedValueMulti) => PostBodyType;
}

export class DynamicSelectControl<ListItemType, ResponseType, PostBodyType = any> extends SelectControl<ListItemType> {
  requestData: IRequestData<ListItemType, ResponseType, PostBodyType>;
  isDependantOnAnotherControl?: string | undefined; // string -> control name, null means no

  constructor(
    name: string,
    label: string,
    requestData: IRequestData<ListItemType, ResponseType, PostBodyType>,
    isMultiSelect: boolean = false,
    defaultValue?: SelectedValueSingle | SelectedValueMulti,
    validators: ValidatorFn | ValidatorFn[] | null = [],
    isDependantOnAnotherControl?: string,
  ) {
    super(
      name,
      label,
      isDependantOnAnotherControl && [] || undefined,
      isMultiSelect,
      true,
      validators,
      defaultValue,
    );

    this.requestData = requestData;
    this.isDependantOnAnotherControl = isDependantOnAnotherControl;
  }
}
