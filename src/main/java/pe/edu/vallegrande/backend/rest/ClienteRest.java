package pe.edu.vallegrande.backend.rest;

import pe.edu.vallegrande.backend.model.Cliente;
import pe.edu.vallegrande.backend.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/cliente")
public class ClienteRest {

    private final ClienteService clienteService;

    @Autowired
    public ClienteRest(ClienteService clienteService) {
        this.clienteService = clienteService;
    }
    
    @GetMapping
    public List <Cliente> getAll(){
        return clienteService.getAll();
    }

    @PostMapping("/save")
    public Cliente save(@RequestBody Cliente cliente) {
        return clienteService.save(cliente);
    }

}
