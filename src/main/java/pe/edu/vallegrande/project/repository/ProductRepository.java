package pe.edu.vallegrande.project.repository;

import pe.edu.vallegrande.project.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
}