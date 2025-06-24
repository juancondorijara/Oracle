import { Component, inject, OnInit } from '@angular/core';

//new import
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/interfaces/customer';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  state: string = 'A';

  displayedColumns: string[] = ['id', 'dni', 'cellPhone', 'firstName', 'lastName', 'state', 'actions'];
  dataSource: Customer[] = [];
  
  router = inject(Router);

  selectedCustomer?: Customer;
  
  private customerService = inject(CustomerService);

  ngOnInit(): void {
    this.findByState();
  }

  goCustomerForm(): void {
    this.router.navigate(['/customer-form']); // Navega al formulario
  }

  findAll(): void {
    this.customerService.findAll().subscribe(response => {
      this.dataSource = response;
      console.log('Listando Datos de Clientes');
    });
  }

  findByState() {
    this.customerService.findByState(this.state).subscribe(response => {
      this.dataSource = response;
      console.log('Listando Datos por Estado= ' + this.state);
    });
  }

  onEdit(customer: Customer): void {
    this.customerService.setSelectedCustomer(customer); // Establece el cliente seleccionado
    this.goCustomerForm(); // Navega al formulario
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Deseas Eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'error',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminando...', '', 'success')
        this.customerService.delete(id).subscribe(data => {
          console.log(data);
          this.findByState();
        }
        );
      }
    })
  }

  reportPdf() {
    this.customerService.reportPdf().subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte.pdf'; // nombre temporal
      link.click();
      URL.revokeObjectURL(url);
    });
  }
  
}