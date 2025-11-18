# Socios App – Node.js + Express + MariaDB

Aplicación web para gestión de socios con login, CRUD completo y soporte para despliegue en AWS (EC2 + RDS + PM2 + Nginx).
Proyecto educativo para la materia **Programación para DevOps**.

---

## Tecnologías

- Node.js + Express  
- MariaDB / MySQL  
- EJS (plantillas)  
- PM2 (producción, instalado globalmente)  
- Nginx (reverse proxy recomendado)  
- dotenv (variables de entorno)  

---

## 📦 Instalación en entorno local (Lubuntu)

### 1. Clonar el repositorio

```bash
git clone https://github.com/<tu-usuario>/socios-app-devops.git
cd socios-app-devops
```

### 2. Instalar Node.js (si aún no está instalado)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### 3. Instalar dependencias de la aplicación

```bash
npm install
```

### 4. Instalar MariaDB y crear base de datos

```bash
sudo apt update
sudo apt install -y mariadb-server mariadb-client
```

Ingresar a MariaDB:

```bash
sudo mariadb
```

Crear base y usuario de ejemplo (adaptar según tus necesidades):

```sql
CREATE DATABASE socios_app;
CREATE USER 'app_user'@'127.0.0.1' IDENTIFIED BY '<contraseña>';
GRANT ALL PRIVILEGES ON socios_app.* TO 'app_user'@'127.0.0.1';
FLUSH PRIVILEGES;
```

Crear tablas:

```bash
mysql -u app_user -p socios_app < sql/schema.sql
```

Crear usuario administrador inicial siguiendo las instrucciones de `sql/README.md`.

---

## ⚙️ Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto (no se sube al repositorio):

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=app_user
DB_PASSWORD=<contraseña>
DB_NAME=socios_app
SESSION_SECRET=<cadena_secreta>
```

Puedes usar `.env.example` como referencia.

---

## ▶ Ejecutar la aplicación en desarrollo

```bash
npm run dev
```

o

```bash
nodemon app.js
```

Luego abrir en el navegador:

```text
http://localhost:3000
```

---

## 🏭 Ejecutar en producción con PM2 (servidor Linux)

Instalar PM2 globalmente:

```bash
sudo npm install -g pm2
```

Iniciar la app:

```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

---

## 🌐 Nginx como reverse proxy (opcional)

Ejemplo de configuración:

```nginx
server {
    listen 80;
    server_name <tu-dominio-o-ip>;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Estructura del proyecto

```text
socios-app-devops/
├─ app.js
├─ db.js
├─ package.json
├─ ecosystem.config.js
├─ .env.example
├─ .gitignore
├─ /views
│   ├─ layout.ejs
│   ├─ login.ejs
│   ├─ socios_list.ejs
│   └─ socio_form.ejs
└─ /sql
    ├─ README.md
    ├─ schema.sql
    ├─ insert_admin.sql
    └─ generate_hash.js
```

---

## ✨ Licencia

Proyecto educativo. Puedes reutilizarlo y adaptarlo para fines de aprendizaje.

