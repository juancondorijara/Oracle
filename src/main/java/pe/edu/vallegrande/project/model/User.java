package pe.edu.vallegrande.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users", schema = "DEVELOPER_01")
public class User {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;   // encriptado AES

    @Column(name = "password")
    private String password;   // hasheado con BCrypt

    @Column(name = "role")
    private String role;       // encriptado AES - Ej: ROLE_USER, ROLE_ADMIN

    @Column(name = "state")
    private String state;

}
