const db = require('../config/db');

// GET /api/subjects
exports.getAll = async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM subjects WHERE user_id = ? ORDER BY name ASC',
    [req.userId]
  );
  res.json(rows);
};

// POST /api/subjects
exports.create = async (req, res) => {
  const { name, color, icon } = req.body;
  if (!name) return res.status(400).json({ message: 'El nombre es requerido' });
  try {
    const [result] = await db.query(
      'INSERT INTO subjects (user_id, name, color, icon) VALUES (?,?,?,?)',
      [req.userId, name, color || '#00BFA5', icon || '📚']
    );
    const [rows] = await db.query('SELECT * FROM subjects WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear materia', error: err.message });
  }
};

// PUT /api/subjects/:id
exports.update = async (req, res) => {
  const { name, color, icon } = req.body;
  await db.query(
    'UPDATE subjects SET name=?, color=?, icon=? WHERE id=? AND user_id=?',
    [name, color, icon, req.params.id, req.userId]
  );
  const [rows] = await db.query('SELECT * FROM subjects WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
};

// DELETE /api/subjects/:id
exports.remove = async (req, res) => {
  await db.query('DELETE FROM subjects WHERE id = ? AND user_id = ?', [req.params.id, req.userId]);
  res.json({ message: 'Materia eliminada' });
};
