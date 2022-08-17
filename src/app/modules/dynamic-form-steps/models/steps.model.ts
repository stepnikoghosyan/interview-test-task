import { AppRoutes } from '../../../models/enums/app-routes.model';

export type Steps = AppRoutes.ClientInfo | AppRoutes.ClientAddress | AppRoutes.ClientIdentity;

export function isAStep(key: AppRoutes | string): boolean {
  return [AppRoutes.ClientInfo, AppRoutes.ClientAddress, AppRoutes.ClientIdentity].includes(key as any);
}
