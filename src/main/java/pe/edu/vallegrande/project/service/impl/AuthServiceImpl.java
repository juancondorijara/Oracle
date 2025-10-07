package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.jwt.JwtUtil;
import pe.edu.vallegrande.project.model.User;
import pe.edu.vallegrande.project.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthServiceImpl {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public List<User> findAll() {
        log.info("Listando Datos: ");
        return userRepository.findAll();
    }

    public User save(User user) {
        log.info("Registrando Datos: ");
        user.setState("A");
        return userRepository.save(user);
    }

    public String login(String username, String password) {
        log.info("Logueandose: ");
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return jwtUtil.generateToken(username);
    }

}
