package pe.edu.vallegrande.project.rest;

import org.springframework.web.bind.annotation.*;

import pe.edu.vallegrande.project.dto.SaleRequest;
import pe.edu.vallegrande.project.dto.SaleResponse;
import pe.edu.vallegrande.project.service.SaleService;
import java.util.List;

@RestController
@RequestMapping("/v1/api/sale")
public class SaleRest {

    private final SaleService saleService;

    public SaleRest(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping
    public List<SaleResponse> findAll() {
        return saleService.findAll();
    }

    @PostMapping("/save")
    public SaleResponse save(@RequestBody SaleRequest saleRequest) {
        return saleService.save(saleRequest);
    }

}
