import { inject, Injectable } from '@angular/core';

//new import
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBackEnd = `${environment.urlBackEnd}/v1/api/customer`;

  private selectedCustomerSubject = new BehaviorSubject<Customer | null>(null);
  selectedCustomer$ = this.selectedCustomerSubject.asObservable();

  setSelectedCustomer(customer: Customer | null): void {
    this.selectedCustomerSubject.next(customer);
  }

  findAll() {
    return this.http.get<Customer[]>(this.urlBackEnd);
  }

  findById(id: number) {
    return this.http.get<Customer[]>(`${this.urlBackEnd}/${id}`);
  }

  save(customer: Customer) {
    return this.http.post<Customer>(`${this.urlBackEnd}/save`, customer);
  }

  update(customer: Customer) {
    return this.http.put<Customer>(`${this.urlBackEnd}/update/${customer.id}`, customer);
  }

  delete(id: number) {
    return this.http.patch<Customer>(`${this.urlBackEnd}/delete/${id}`, ``);
  }

  restore(id: number) {
    return this.http.patch<Customer>(`${this.urlBackEnd}/restore/${id}`, ``);
  }

}
