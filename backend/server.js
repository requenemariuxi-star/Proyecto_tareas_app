require('dotenv').config();
require('./src/config/db'); // Verificar conexión MySQL al arrancar

const express = require('express');
const cors    = require('cors');

const app = express();

// ─── Middlewares ──────────────────────────────────────────
app.use(cors({ origin: '*' })); // Permite Capacitor y dev local
app.use(express.json());

// ─── Rutas ────────────────────────────────────────────────
app.use('/api/auth',          require('./src/routes/auth.routes'));
app.use('/api/tasks',         require('./src/routes/tasks.routes'));
app.use('/api/subjects',      require('./src/routes/subjects.routes'));
app.use('/api/notifications', require('./src/routes/notifications.routes'));

// ─── Health check ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Tareas Escolares activa', timestamp: new Date() });
});

// ─── Iniciar servidor ─────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
