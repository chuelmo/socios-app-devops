// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware de protección de rutas
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// RUTA RAÍZ
app.get('/', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.redirect('/socios');
});

// LOGIN
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.render('login', { error: 'Usuario o contraseña inválidos' });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.render('login', { error: 'Usuario o contraseña inválidos' });
    }

    // Login OK
    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect('/socios');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Error interno' });
  }
});

// LOGOUT
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// LISTAR SOCIOS
app.get('/socios', requireLogin, async (req, res) => {
  try {
    const [socios] = await pool.query('SELECT * FROM socios ORDER BY id DESC');
    res.render('socios_list', { socios, username: req.session.username });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener socios');
  }
});

// FORMULARIO NUEVO SOCIO
app.get('/socios/nuevo', requireLogin, (req, res) => {
  res.render('socio_form', {
    socio: {},
    action: '/socios/nuevo',
    title: 'Alta de socio'
  });
});

// ALTA SOCIO
app.post('/socios/nuevo', requireLogin, async (req, res) => {
  const { nombre, email, telefono } = req.body;

  try {
    await pool.query(
      'INSERT INTO socios (nombre, email, telefono) VALUES (?, ?, ?)',
      [nombre, email, telefono]
    );
    res.redirect('/socios');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear socio');
  }
});

// FORMULARIO EDICIÓN SOCIO
app.get('/socios/:id/editar', requireLogin, async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await pool.query('SELECT * FROM socios WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Socio no encontrado');
    }
    res.render('socio_form', {
      socio: rows[0],
      action: `/socios/${id}/editar`,
      title: 'Edición de socio'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener socio');
  }
});

// MODIFICACIÓN SOCIO
app.post('/socios/:id/editar', requireLogin, async (req, res) => {
  const id = req.params.id;
  const { nombre, email, telefono } = req.body;

  try {
    await pool.query(
      'UPDATE socios SET nombre = ?, email = ?, telefono = ? WHERE id = ?',
      [nombre, email, telefono, id]
    );
    res.redirect('/socios');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar socio');
  }
});

// BAJA SOCIO
app.post('/socios/:id/eliminar', requireLogin, async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM socios WHERE id = ?', [id]);
    res.redirect('/socios');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar socio');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

