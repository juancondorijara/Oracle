-- Crear el registro si es que no se duplican datos unicos o se insertan datos nulos
INSERT INTO CUSTOMER (DNI, CELLPHONE, FIRST_NAME, LAST_NAME, STATE)
VALUES ('12345678', '987654321', 'Juan', 'Sanchez', 'A');



INSERT INTO PRODUCT 
(NAME, DESCRIPTION, PURCHASE_PRICE, SALE_PRICE, STOCK, STATE) 
VALUES 
('galleta', 'de chocolate', 2.5, 3, 10, 'A');

INSERT INTO PRODUCT 
(NAME, DESCRIPTION, PURCHASE_PRICE, SALE_PRICE, STOCK, STATE) 
VALUES 
('gaseosa', 'sabor inka cola', 2.5, 3, 10, 'A');
