package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.jwt.AESUtil;
import pe.edu.vallegrande.project.jwt.JwtUtil;
import pe.edu.vallegrande.project.model.User;
import pe.edu.vallegrande.project.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthServiceImpl {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AESUtil aesUtil;

    @Autowired
    private JwtUtil jwtUtil;

    public List<User> findAll() {
        log.info("Listando Datos: ");
        return userRepository.findAll();
    }

    public User save(User user) {
        log.info("Registrando Datos: ");
        user.setUsername(aesUtil.encrypt(user.getUsername()));
        user.setRole(aesUtil.encrypt(user.getRole()));
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        user.setState("A");
        return userRepository.save(user);
    }

    public String login(String username, String password) {
        log.info("Logueandose: ");
        // Buscar por username encriptado
        String encryptedUsername = aesUtil.encrypt(username);
        User user = userRepository.findByUsername(encryptedUsername)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return jwtUtil.generateToken(username);
    }

}
