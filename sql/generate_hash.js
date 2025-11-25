// sql/generate_hash.js
const bcrypt = require('bcrypt');

(async () => {
  // Toma el argumento de consola, ej: node generate_hash.js admin123
  const password = process.argv[2] || 'admin123';

  try {
    const hash = await bcrypt.hash(password, 10);
    console.log(`Contraseña en texto plano: ${password}`);
    console.log(`Hash generado: ${hash}`);
  } catch (err) {
    console.error("Error generando el hash:", err);
  }

  process.exit(0);
})();
