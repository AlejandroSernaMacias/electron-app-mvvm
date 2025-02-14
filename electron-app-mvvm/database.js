const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'mydatabase.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      email TEXT,
      edad INTEGER
    )
  `);
});

function guardarUsuario(usuario) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO usuarios (nombre, email, edad) VALUES (?, ?, ?)',
      [usuario.nombre, usuario.email, usuario.edad],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

module.exports = { guardarUsuario };