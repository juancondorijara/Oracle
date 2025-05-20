import { Routes } from '@angular/router';

//new import
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { CustomerFormComponent } from './feature/customer/customer-form/customer-form.component';
import { CustomerListComponent } from './feature/customer/customer-list/customer-list.component';

export const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'customer-form',
                component: CustomerFormComponent
            },
            {
                path: 'customer-list',
                component: CustomerListComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'customer-list'
            }
        ]
    }
];
