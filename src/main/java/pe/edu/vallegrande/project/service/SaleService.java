package pe.edu.vallegrande.project.service;

import java.util.List;

import pe.edu.vallegrande.project.dto.SaleRequest;
import pe.edu.vallegrande.project.dto.SaleResponse;

public interface SaleService {

    SaleResponse save(SaleRequest saleRequest);

    List<SaleResponse> findAll();

}
