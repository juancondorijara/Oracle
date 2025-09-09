package pe.edu.vallegrande.project.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "sale_detail", schema = "DEVELOPER_01")
public class SaleDetail {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sale_id", nullable = false)
    private Sale sale;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "subtotal")
    private Double subtotal;

    @Column(name = "state")
    private String state;

}
