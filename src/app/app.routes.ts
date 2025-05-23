import { Routes } from '@angular/router';

//new import
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { CustomerFormComponent } from './feature/customer/customer-form/customer-form.component';
import { CustomerListComponent } from './feature/customer/customer-list/customer-list.component';
import { CustomerFormHtmlComponent } from './feature/customer-html/customer-form-html/customer-form-html.component';
import { CustomerListHtmlComponent } from './feature/customer-html/customer-list-html/customer-list-html.component';

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
                path: 'customer-form-html',
                component: CustomerFormHtmlComponent
            },
            {
                path: 'customer-list-html',
                component: CustomerListHtmlComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'customer-list'
            }
        ]
    }
];
