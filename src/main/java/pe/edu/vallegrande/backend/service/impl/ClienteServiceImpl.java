package pe.edu.vallegrande.backend.service.impl;

import pe.edu.vallegrande.backend.model.Cliente;
import pe.edu.vallegrande.backend.repository.ClienteRepository;
import pe.edu.vallegrande.backend.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.util.List;

@Slf4j
@Service
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public List<Cliente> getAll() {
        log.info("Lista Cliente");
        return clienteRepository.findAll();
    }

    @Override
    public Cliente save(Cliente cliente) {
        log.info("Registro Cliente: " + cliente.toString());
        return clienteRepository.save(cliente);
    }

}
