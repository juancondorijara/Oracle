package pe.edu.vallegrande.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.vallegrande.project.model.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {

}
