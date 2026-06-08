const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'tareas',
  waitForConnections: true,
  connectionLimit:    10,
  charset: 'utf8mb4',
});

// Verificar conexión al iniciar
pool.getConnection()
  .then((conn) => {
    console.log('✅ MySQL conectado — DB:', process.env.DB_NAME || 'tareas');
    conn.release();
  })
  .catch((err) => {
    console.error('❌ Error de conexión MySQL:', err.message);
  });

module.exports = pool;
