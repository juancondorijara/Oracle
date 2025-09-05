package pe.edu.vallegrande.project.service;

import pe.edu.vallegrande.project.dto.SaleRequest;
import pe.edu.vallegrande.project.dto.SaleResponse;

public interface SaleService {

    SaleResponse save(SaleRequest saleRequest);

}
