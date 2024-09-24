import { Component } from '@angular/core';

//EXTRAS
import { ClienteInterface } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {

  constructor(
    private clienteService: ClienteService
  ) { }

  clienteInterfaces: ClienteInterface [] = [];
  clienteInterface: ClienteInterface | undefined;

  ngOnInit(): void {
    this.listAll();
  }

  listAll(): void {
    this.clienteService.listAll().subscribe(
      (rest: any) => {
        this.clienteInterfaces = rest;
        console.log("Mostrando a todas las consultas: ", rest);
      }
    );
  }

}
