import { Component } from '@angular/core';

//EXTRAS
import { ClienteInterface } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit  {

  constructor(
    private clienteService: ClienteService
  ) { }

  clienteInterfaces: ClienteInterface [] = [];
  public clienteForm: FormGroup = new FormGroup({});
  //clienteInterface: ClienteInterface = {} as ClienteInterface;

  clienteInterface: ClienteInterface = {
    idcli: 0,
    dnicli: '',
    nomcli: '',
    estcli: ''
  };

  ngOnInit(): void {
  }

  save(clienteInterface: ClienteInterface) {
    Swal.fire({
      title: '¿Deseas Registrar?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.save(this.clienteInterface).subscribe(
          resp => {
            console.log(resp);
          },
          error => {
            console.log(error);
          }
        );
      }
    })
  }

}
