const db = require('../config/db');

// GET /api/tasks
exports.getAll = async (req, res) => {
  const [rows] = await db.query(
    `SELECT t.*, s.name AS subject_name, s.color AS subject_color
     FROM tasks t LEFT JOIN subjects s ON t.subject_id = s.id
     WHERE t.user_id = ? ORDER BY t.due_date ASC`,
    [req.userId]
  );
  res.json(rows);
};

// GET /api/tasks/today
exports.getToday = async (req, res) => {
  const [rows] = await db.query(
    `SELECT t.*, s.name AS subject_name, s.color AS subject_color
     FROM tasks t LEFT JOIN subjects s ON t.subject_id = s.id
     WHERE t.user_id = ? AND DATE(t.due_date) = CURDATE()
     ORDER BY t.due_date ASC`,
    [req.userId]
  );
  res.json(rows);
};

// GET /api/tasks/pending
exports.getPending = async (req, res) => {
  const [rows] = await db.query(
    `SELECT t.*, s.name AS subject_name, s.color AS subject_color
     FROM tasks t LEFT JOIN subjects s ON t.subject_id = s.id
     WHERE t.user_id = ? AND t.completed = 0 ORDER BY t.due_date ASC`,
    [req.userId]
  );
  res.json(rows);
};

// GET /api/tasks/completed
exports.getCompleted = async (req, res) => {
  const [rows] = await db.query(
    `SELECT t.*, s.name AS subject_name, s.color AS subject_color
     FROM tasks t LEFT JOIN subjects s ON t.subject_id = s.id
     WHERE t.user_id = ? AND t.completed = 1 ORDER BY t.due_date DESC`,
    [req.userId]
  );
  res.json(rows);
};

// POST /api/tasks
exports.create = async (req, res) => {
  const { title, description, subject_id, due_date } = req.body;
  if (!title || !due_date)
    return res.status(400).json({ message: 'Título y fecha de entrega requeridos' });
  try {
    const [result] = await db.query(
      'INSERT INTO tasks (user_id, subject_id, title, description, due_date) VALUES (?,?,?,?,?)',
      [req.userId, subject_id || null, title, description || '', due_date]
    );
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear tarea', error: err.message });
  }
};

// PUT /api/tasks/:id
exports.update = async (req, res) => {
  const { title, description, subject_id, due_date } = req.body;
  try {
    await db.query(
      'UPDATE tasks SET title=?, description=?, subject_id=?, due_date=? WHERE id=? AND user_id=?',
      [title, description, subject_id || null, due_date, req.params.id, req.userId]
    );
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar tarea', error: err.message });
  }
};

// PATCH /api/tasks/:id/complete
exports.toggleComplete = async (req, res) => {
  try {
    await db.query(
      'UPDATE tasks SET completed = NOT completed WHERE id = ? AND user_id = ?',
      [req.params.id, req.userId]
    );
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar estado', error: err.message });
  }
};

// DELETE /api/tasks/:id
exports.remove = async (req, res) => {
  await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.userId]);
  res.json({ message: 'Tarea eliminada' });
};
