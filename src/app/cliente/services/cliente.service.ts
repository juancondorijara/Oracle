import { Injectable } from '@angular/core';

//EXTRAS
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ClienteInterface } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {}

  private url: string = environment.api_backend;

  clienteSelected: ClienteInterface | undefined;

  listAll() {
    return this.http.get(this.url);
  }
  
  save(clienteInterface: ClienteInterface | undefined) {
    return this.http.post(this.url + '/save', clienteInterface);
  }

}
