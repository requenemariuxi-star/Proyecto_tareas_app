const db = require('../config/db');

// GET /api/notifications
exports.getAll = async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
    [req.userId]
  );
  res.json(rows);
};

// PATCH /api/notifications/:id/read
exports.markRead = async (req, res) => {
  await db.query(
    'UPDATE notifications SET read_at = NOW() WHERE id = ? AND user_id = ?',
    [req.params.id, req.userId]
  );
  res.json({ message: 'Notificación marcada como leída' });
};
