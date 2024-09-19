package pe.edu.vallegrande.backend.service;

import pe.edu.vallegrande.backend.model.Cliente;
import java.util.List;

public interface ClienteService {

    List<Cliente> getAll();

    Cliente save(Cliente cliente);
    
}
