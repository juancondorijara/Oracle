package pe.edu.vallegrande.project.repository;

import pe.edu.vallegrande.project.model.Customer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByState(String state);
    
}