package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.model.Customer;
import java.util.List;
import java.util.Optional;

public interface CustomerService {

    List<Customer> findAll();

    List<Customer> findByState(String state);

    Optional<Customer> findById(Long id);

    Customer save(Customer customer);

    Customer update(Customer customer);

    Customer delete(Long id);

    Customer restore(Long id);

    byte[] generateJasperPdfReport() throws Exception;
    
}