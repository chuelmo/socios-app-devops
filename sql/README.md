# Carpeta SQL – Socios App

Este directorio contiene los scripts necesarios para inicializar la base de datos del proyecto **Socios App**.

---

## Archivos incluidos

### 1. `schema.sql`
Crea la estructura de tablas:

- `users`
- `socios`

**Ejecutar localmente:**
```bash
mysql -u <master_user> -p  < schema.sql
```

**Ejecutar en RDS:**
```bash
mysql -h <endpoint> -u <master_user> -p < schema.sql
```

---

### 2. `generate_hash.js`
Script Node.js que genera un hash bcrypt para una contraseña.

**Uso:**
```bash
node generate_hash.js
```

Copiar el hash mostrado para utilizarlo en `insert_admin.sql`.

---

### 3. `insert_admin.sql`
Inserta el usuario administrador inicial.

Antes de ejecutarlo, editar:

```sql
INSERT INTO users (username, password_hash)
VALUES ('admin', 'PEGAR_HASH_AQUI');
```

**Ejecutar:**
```bash
mysql -u <app_user> -p <base> < insert_admin.sql
```

---

## Verificación

```sql
SELECT * FROM users;
```

Si aparece el usuario `admin`, la base está inicializada.

---

## ✔ Notas

- No contiene credenciales reales.
- Puede subirse al repositorio de GitHub sin riesgos.
- Funciona tanto en desarrollo local como en AWS RDS.
