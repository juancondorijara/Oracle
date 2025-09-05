package pe.edu.vallegrande.project.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import pe.edu.vallegrande.project.dto.SaleRequest;
import pe.edu.vallegrande.project.dto.SaleResponse;
import pe.edu.vallegrande.project.model.Sale;
import pe.edu.vallegrande.project.model.SaleDetail;
import pe.edu.vallegrande.project.repository.CustomerRepository;
import pe.edu.vallegrande.project.repository.ProductRepository;
import pe.edu.vallegrande.project.repository.SaleRepository;
import pe.edu.vallegrande.project.service.SaleService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SaleImpl implements SaleService {

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final SaleRepository saleRepository;

    public SaleImpl(CustomerRepository customerRepository, ProductRepository productRepository, SaleRepository saleRepository) {
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.saleRepository = saleRepository;
    }

    @Transactional
    public SaleResponse save(SaleRequest request) {
        var customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Sale sale = new Sale();
        sale.setCustomer(customer);
        sale.setSaleDate(java.time.LocalDateTime.now());
        sale.setState("A");

        List<SaleDetail> details = new ArrayList<>();
        double total = 0;

        for (SaleRequest.ProductRequest pr : request.getProducts()) {
            var product = productRepository.findById(pr.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            if (product.getStock() < pr.getQuantity()) {
                throw new RuntimeException("Stock insuficiente para: " + product.getName());
            }

            // actualizar stock
            product.setStock(product.getStock() - pr.getQuantity());
            productRepository.save(product);

            // calcular subtotal
            double subtotal = product.getSalePrice() * pr.getQuantity();

            SaleDetail detail = new SaleDetail();
            detail.setProduct(product);
            detail.setQuantity(pr.getQuantity());
            detail.setSubtotal(subtotal);
            detail.setSale(sale);
            detail.setState("A");

            details.add(detail);
            total += subtotal;
        }

        sale.setTotal(total);
        sale.setDetails(details);

        Sale saved = saleRepository.save(sale); // cascada guarda sale + detalles
        return toDto(saved);
    }


    public static SaleResponse toDto(Sale sale) {
        SaleResponse dto = new SaleResponse();
        dto.setSaleId(sale.getId());
        dto.setSaleDate(sale.getSaleDate());
        dto.setTotal(sale.getTotal());
        dto.setState(sale.getState());

        // cliente
        SaleResponse.CustomerDto c = new SaleResponse.CustomerDto();
        c.setCustomerId(sale.getCustomer().getId());
        c.setDni(sale.getCustomer().getDni());
        c.setFirstName(sale.getCustomer().getFirstName());
        c.setLastName(sale.getCustomer().getLastName());
        dto.setCustomer(c);

        // productos
        dto.setProducts(
            sale.getDetails().stream().map(d -> {
                SaleResponse.ProductDetailDto pd = new SaleResponse.ProductDetailDto();
                pd.setProductId(d.getProduct().getId());
                pd.setName(d.getProduct().getName());
                pd.setDescription(d.getProduct().getDescription());
                pd.setSalePrice(d.getProduct().getSalePrice());
                pd.setQuantity(d.getQuantity());
                pd.setSubtotal(d.getSubtotal());
                return pd;
            }).collect(Collectors.toList())
        );

        return dto;
    }

}
