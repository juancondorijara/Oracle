package pe.edu.vallegrande.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "CLIENTE")
public class Cliente {

    @Id
    @Column(name = "IDCLI")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IDCLI;

    @Column(name = "DNICLI")
    private String DNICLI;

    @Column(name = "NOMCLI")
    private String NOMCLI;

    @Column(name = "ESTCLI")
    private String ESTCLI;
    
}
