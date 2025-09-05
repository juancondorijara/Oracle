package pe.edu.vallegrande.project.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "sale")
public class Sale {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(name = "sale_date")
    private LocalDateTime saleDate;
    
    @Column(name = "total")
    private Double total;

    @Column(name = "state")
    private String state;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL)
    private List<SaleDetail> details;
}
