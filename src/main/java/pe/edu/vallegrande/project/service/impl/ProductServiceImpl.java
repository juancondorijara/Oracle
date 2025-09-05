package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.Product;
import pe.edu.vallegrande.project.repository.ProductRepository;
import pe.edu.vallegrande.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> findAll() {
        log.info("Listando Datos: ");
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        log.info("Listando Datos por ID: ");
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        log.info("Registrondo Datos: " + product.toString());
        product.setState("A");
        return productRepository.save(product);
    }

    @Override
    public Product update(Product product) {
        log.info("Editando Datos: " + product.toString());
        product.setState("A");
        return productRepository.save(product);
    }

}

