import { AppRoutes } from '../../../models/enums/app-routes.model';

export function getFullRoute(route: AppRoutes): string {
  const config: { [key in AppRoutes]?: string } = {
    [AppRoutes.ClientInfo]: `${AppRoutes.ClientForm}/${AppRoutes.ClientInfo}`,
    [AppRoutes.ClientAddress]: `${AppRoutes.ClientForm}/${AppRoutes.ClientAddress}`,
    [AppRoutes.ClientIdentity]: `${AppRoutes.ClientForm}/${AppRoutes.ClientIdentity}`,
    [AppRoutes.CreatedClient]: `${AppRoutes.ClientForm}/${AppRoutes.CreatedClient}`,
  };

  return `/${config[route] || route}`;
}
