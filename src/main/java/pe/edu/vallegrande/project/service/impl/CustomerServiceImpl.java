package pe.edu.vallegrande.project.service.impl;

import pe.edu.vallegrande.project.model.Customer;
import pe.edu.vallegrande.project.repository.CustomerRepository;
import pe.edu.vallegrande.project.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import javax.sql.DataSource;

@Slf4j
@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final DataSource dataSource;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository,DataSource dataSource) {
        this.customerRepository = customerRepository;
        this.dataSource = dataSource;
    }

    @Override
    public List<Customer> findAll() {
        log.info("Listando Datos: ");
        return customerRepository.findAll();
    }

    @Override
    public List<Customer> findByState(String state) {
        log.info("Listando Datos por Estado: " + state);
        return customerRepository.findByState(state);
    }

    @Override
    public Optional<Customer> findById(Long id) {
        log.info("Listando Datos por ID: " + id);
        return customerRepository.findById(id);
    }

    @Override
    public Customer save(Customer customer) {
        log.info("Registrondo Datos: " + customer.toString());
        customer.setState("A");
        return customerRepository.save(customer);
    }

    @Override
    public Customer update(Customer customer) {
        log.info("Editando Datos: " + customer.toString());
        customer.setState("A");
        return customerRepository.save(customer);
    }

    @Override
    public Customer delete(Long id) {
        log.info("Eliminando Datos: " + id);
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        customer.setState("I");
        return customerRepository.save(customer);
    }

    @Override
    public Customer restore(Long id) {
        log.info("Restaurando Datos: " + id);
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        customer.setState("A");
        return customerRepository.save(customer);
    }

    @Override
    public byte[] generateJasperPdfReport() throws Exception {
        // Cargar archivo .jasper en src/main/resources/reports (SIN USAR IMÁGENES EN EL JASPER)
        InputStream jasperStream = new ClassPathResource("reports/Customer.jasper").getInputStream();
        // Sin parámetros
        HashMap<String, Object> params = new HashMap<>();
        // Llenar reporte con conexión a Oracle Cloud con application.yml | aplicación.properties
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperStream, params, dataSource.getConnection());
        // Exportar a PDF
        log.info("Reporte Jasper en PDF");
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

}