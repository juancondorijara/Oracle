package pe.edu.vallegrande.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.vallegrande.project.model.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

}
