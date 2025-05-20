import { Component, inject, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

//new import
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/interfaces/customer';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class CustomerFormComponent {

  private customerService = inject(CustomerService);

  @Input() customer?: Customer;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      dni: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{8}$/) // Solo 8 números
        ]
      ],
      cellPhone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^9\d{8}$/) // Solo 9 números y empieza por 9
        ]
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/) // Solo letras, tildes, ñ y espacios
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/) // Solo letras, tildes, ñ y espacios
        ]
      ],
    });
  }

  onlyNumbers(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  onlyLetters(event: KeyboardEvent) {
    const pattern = /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  save() {
    Swal.fire({
      title: '¿Deseas Registrar?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        const customer: Customer = this.form.value;
        this.customerService.save(customer).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Registrado!',
              text: 'El cliente ha sido registrado correctamente.',
              confirmButtonColor: '#3085d6'
            }).then(() => {
              this.goCustomerList();
            });
            this.form.reset();
          },
          error: err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al guardar el cliente.',
              confirmButtonColor: '#d33'
            });
            console.error('Error al registrar cliente', err);
          }
        });
      }
    })
  }

  goCustomerList(): void {
    this.router.navigate(['/customer-list']); // Navega a la lista
  }

}