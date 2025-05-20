import { Component, inject, OnInit } from '@angular/core';

//new import
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/interfaces/customer';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
  imports: [
    MatTableModule, 
    MatIconModule
  ]
})
export class CustomerListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'dni', 'cellPhone', 'firstName', 'lastName', 'state', 'actions'];
  dataSource: Customer[] = [];
  
  customerStateService = inject(CustomerService); // Inyecta el servicio
  router = inject(Router);

  customerService = inject(CustomerService);

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.customerService.findAll().subscribe(response => {
      console.log('Data:', response);
      this.dataSource = response;
    });
  }

  goCustomerForm(): void {
    this.router.navigate(['/customer-form']); // Navega al formulario
  }
  
}