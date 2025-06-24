import { Component, OnInit, inject } from '@angular/core';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/interfaces/customer';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; //usar ngFor y listar en la tabla 
import Swal from 'sweetalert2'; // Librería para alertas

@Component({
  selector: 'app-customer-list-html',
  standalone: true,
  templateUrl: './customer-list-html.component.html',
  styleUrl: './customer-list-html.component.css',
  imports: [CommonModule]
})
export class CustomerListHtmlComponent implements OnInit {

  state: string = 'A';

  customers: Customer[] = [];
  router = inject(Router);
  customerService = inject(CustomerService);

  ngOnInit(): void {
    this.findByState(); //lista por Estado A | I
    //this.findAll();   // lista todos
  }

  goCustomerForm(): void {
    this.router.navigate(['/customer-form-html']);
  }

  findAll(): void {
    this.customerService.findAll().subscribe(response => {
      this.customers = response;
      console.log('Listando Datos de Clientes');
    });
  }

  findByState() {
    this.customerService.findByState(this.state).subscribe(response => {
      this.customers = response;
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
