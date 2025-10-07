package pe.edu.vallegrande.project.rest;

import pe.edu.vallegrande.project.model.User;
import pe.edu.vallegrande.project.dto.AuthRequest;
import pe.edu.vallegrande.project.service.impl.AuthServiceImpl;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;
import lombok.Data;

@RestController
@RequestMapping("/v1/api/auth")
public class AuthRest {

    @Autowired
    private AuthServiceImpl authServiceImpl;

    @GetMapping
    public List<User> findAll(){
        return authServiceImpl.findAll();
    }

    @PostMapping("/save")
    public User save(@RequestBody User user) {
        return authServiceImpl.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        String token = authServiceImpl.login(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(new JwtResponse(token));
    }

}


@Data
class JwtResponse {
    private final String token;
}