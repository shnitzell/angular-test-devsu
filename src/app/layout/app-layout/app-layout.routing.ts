import { Routes } from '@angular/router';

import { AddProductComponent } from '../../pages/add-product/add-product.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

export const AppLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-product', component: AddProductComponent },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
  /* Componentes de formularios */

  //{ path: 'facturar', component: FacturarComponent },
  //{ path: 'park', component: ParkComponent },
  //{ path: 'ventanilla', component: VentanillaComponent },
];
