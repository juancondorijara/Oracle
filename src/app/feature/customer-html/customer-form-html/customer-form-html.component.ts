import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/interfaces/customer';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form-html',
  standalone: true,
  templateUrl: './customer-form-html.component.html',
  styleUrl: './customer-form-html.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CustomerFormHtmlComponent implements OnInit {

  private customerService = inject(CustomerService);

  @Input() customer?: Customer;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [''],
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

  ngOnInit(): void {
    this.customerService.selectedCustomer$.subscribe(customer => {
      if (customer) {
        this.form.patchValue(customer); // Carga los datos en el formulario
      }
    });
  }

  //Navegar a la lista de clientes
  goCustomerList(): void {
    this.router.navigate(['/customer-list-html']);
  }

  //Validar solo números
  onlyNumbers(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  //Validar solo letras
  onlyLetters(event: KeyboardEvent) {
    const pattern = /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  //Registrar o actualizar con Alerta (sweetalert2)
  onSubmit(): void {
    if (this.form.invalid) return;

    const customerData = this.form.value as Customer;
    const isUpdate = !!customerData.id;

    Swal.fire({
      title: isUpdate ? '¿Deseas actualizar?' : '¿Deseas registrar?',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: isUpdate ? 'Actualizar' : 'Registrar',
      denyButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        const request = isUpdate
          ? this.customerService.update(customerData)
          : this.customerService.save(customerData);

        request.subscribe({
          next: res => {
            Swal.fire({
              icon: 'success',
              title: isUpdate ? '¡Actualizado!' : '¡Registrado!',
              text: isUpdate
                ? 'Actualizado con Éxito.'
                : 'Registrado con Éxito.',
              confirmButtonColor: '#3085d6'
            }).then(() => {
              this.saved.emit();
              this.form.reset();
              this.goCustomerList();
            });
          },
          error: err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: isUpdate
                ? 'Error al actualizar'
                : 'Error al registrar',
              confirmButtonColor: '#d33'
            });
            console.error('Error al guardar:', err);
          }
        });
      }
    });
  }

}
