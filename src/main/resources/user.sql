--Consultar usuarios y tablespaces asignados
SELECT username,
       default_tablespace,
       temporary_tablespace,
       account_status
FROM dba_users
ORDER BY username;


--Crear el usuario DEVELOPER_01 en el tablespace DATA
CREATE USER DEVELOPER_01 IDENTIFIED BY Admin12345678;

--Crear el usuario DEVELOPER_02 en el tablespace DATA
CREATE USER DEVELOPER_02 IDENTIFIED BY Admin12345678;


--Otorgar los permisos a DEVELOPER_01 para conexión y recursos (tablas, vistas, etc.)
GRANT CONNECT, RESOURCE TO DEVELOPER_01;

--Otorgar los permisos a DEVELOPER_02 para conexión y recursos (tablas, vistas, etc.)
GRANT CONNECT, RESOURCE TO DEVELOPER_02;


--Asignar espacio ilimitado en el tablespace DATA al usuario DEVELOPER_01
ALTER USER DEVELOPER_01 QUOTA UNLIMITED ON DATA;

--Asignar espacio ilimitado en el tablespace DATA al usuario DEVELOPER_02
ALTER USER DEVELOPER_02 QUOTA UNLIMITED ON DATA;


--Habilitar REST en el esquema DEVELOPER_01 usando ORDS
BEGIN
  ORDS.ENABLE_SCHEMA(
    p_enabled => TRUE,                        -- Activar el acceso REST
    p_schema => 'DEVELOPER_01',               -- Nombre del esquema (usuario)
    p_url_mapping_type => 'BASE_PATH',        -- Tipo de mapeo de URL base
    p_url_mapping_pattern => 'DEVELOPER_01',  -- Ruta base para acceder vía REST (ej. /ords/DEVELOPER_01/)
    p_auto_rest_auth => FALSE                 -- FALSE permite el acceso sin autenticación OAuth2
  );
END;
/

--Habilitar REST en el esquema DEVELOPER_02 usando ORDS
BEGIN
  ORDS.ENABLE_SCHEMA(
    p_enabled => TRUE,                        -- Activar el acceso REST
    p_schema => 'DEVELOPER_02',               -- Nombre del esquema (usuario)
    p_url_mapping_type => 'BASE_PATH',        -- Tipo de mapeo de URL base
    p_url_mapping_pattern => 'DEVELOPER_02',  -- Ruta base para acceder vía REST (ej. /ords/DEVELOPER_02/)
    p_auto_rest_auth => FALSE                 -- FALSE permite el acceso sin autenticación OAuth2
  );
END;
/


-- Crear el rol DEVELOPER_ROLE
CREATE ROLE DEVELOPER_ROLE;

-- Rol que permite a DEVELOPER_02 acceder a tablas de DEVELOPER_01
GRANT SELECT, INSERT, UPDATE, DELETE ON DEVELOPER_01.CUSTOMER TO DEVELOPER_ROLE;
GRANT SELECT, INSERT, UPDATE, DELETE ON DEVELOPER_01.SALE TO DEVELOPER_ROLE;
GRANT SELECT, INSERT, UPDATE, DELETE ON DEVELOPER_01.SALE_DETAIL TO DEVELOPER_ROLE;

-- Rol que permite a DEVELOPER_01 acceder a tablas de DEVELOPER_02
GRANT SELECT, INSERT, UPDATE, DELETE ON DEVELOPER_02.PRODUCT TO DEVELOPER_ROLE;


-- Asiganar el rol DEVELOPER_ROLE a los usuarios DEVELOPER_01 y DEVELOPER_02
GRANT DEVELOPER_ROLE TO DEVELOPER_01;
GRANT DEVELOPER_ROLE TO DEVELOPER_02;


-- Crear un sinónimo llamado CUSTOMER en el esquema DEVELOPER_02.
CREATE SYNONYM DEVELOPER_02.CUSTOMER FOR DEVELOPER_01.CUSTOMER;

-- Crear un sinónimo llamado PRODUCT en el esquema DEVELOPER_01.
CREATE SYNONYM DEVELOPER_01.PRODUCT FOR DEVELOPER_02.PRODUCT;


-- Eliminar los sinónimos creados
DROP SYNONYM DEVELOPER_01.PRODUCT;
DROP SYNONYM DEVELOPER_02.CUSTOMER;






-- 1. Deshabilitar REST (ORDS) en el esquema
BEGIN
    ords_admin.disable_schema(
        p_schema => 'DEVELOPER_01'
    );
END;
/

-- 2. Eliminar cualquier definición ORDS asociada al esquema
BEGIN
    ords_admin.drop_rest_for_schema(
        p_schema => 'DEVELOPER_01'
    );
END;
/

-- 3. Borrar el usuario y todos sus objetos
DROP USER DEVELOPER_01 CASCADE;