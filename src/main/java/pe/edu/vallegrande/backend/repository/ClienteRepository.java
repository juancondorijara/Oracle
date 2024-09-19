package pe.edu.vallegrande.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.vallegrande.backend.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
}
