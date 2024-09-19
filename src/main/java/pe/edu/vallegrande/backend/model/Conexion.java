package pe.edu.vallegrande.backend.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Conexion {

    private static Connection cnx = null;

    public static Connection conectar() throws Exception {
        try {
            String user = "dbDemo";
            String pwd = "12345";
            String driver = "oracle.jdbc.driver.OracleDriver";
            String url = "jdbc:oracle:thin:@localhost:1521:xe";
            Class.forName(driver).newInstance();
            cnx = DriverManager.getConnection(url, user, pwd);
        } catch (Exception e) {
            System.out.println("Error de Conexión/Conectar " + e.getMessage());
        }
        return cnx;
    }

    public static Connection getCnx() {
        return cnx;
    }

    public static void setCnx(Connection aCnx) {
        cnx = aCnx;
    }

    public void cerrar() throws Exception {
        if (cnx != null) {
            cnx.close();
        }
    }

    public static void main(String[] args) throws Exception {
        conectar();
        try {
            if (cnx != null) {
                System.out.println("CONEXIÓN EXITOSA");
            } else {
                System.out.println("SIN CONEXIÓN REVISA");
            }
        } catch (Exception e) {
            System.out.println("Error en " + e.getMessage());
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, e);
        }
    }

    public Connection getCn() {
        return cnx;
    }

    public void setCn(Connection cnx) {
        this.cnx = cnx;
    }

}
