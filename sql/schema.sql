-- CREATE DATABASE IF NOT EXISTS `${DB_NAME}`
--  CHARACTER SET utf8mb4
-- COLLATE utf8mb4_unicode_ci;

-- CREATE USER IF NOT EXISTS '${DB_USER}'@'${DB_HOST_ALLOWED}' IDENTIFIED BY '${DB_PASSWORD}';
-- GRANT ALL PRIVILEGES ON `${DB_NAME}`.* TO '${DB_USER}'@'${DB_HOST_ALLOWED}';
-- FLUSH PRIVILEGES;

-- USE `${DB_NAME}`;

-- Tabla de usuarios para login
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- Usuario de prueba: luego insertás un hash de bcrypt
-- Ejemplo: user: admin / pass: admin123 (ver abajo cómo generar el hash)
-- Para esto hemos incluido el script generate_hash.js y el insert_admin.sql

-- Tabla de socios
CREATE TABLE IF NOT EXISTS socios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(30),
    fecha_alta DATE DEFAULT (CURRENT_DATE)
);

-- Cargar algunos socios de ejemplo
INSERT INTO socios (nombre, email, telefono) VALUES ('Juan', 'juan@empresa.com', '+59891052110');
INSERT INTO socios (nombre, email, telefono) VALUES ('Marta', 'marta@empresa.com', '+59891052111');
INSERT INTO socios (nombre, email, telefono) VALUES ('Leticia', 'leticia@empresa.com', '+59891052112');
