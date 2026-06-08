const router = require('express').Router();
const auth   = require('../middleware/authMiddleware');
const ctrl   = require('../controllers/notifications.controller');

router.use(auth);

router.get('/',              ctrl.getAll);
router.patch('/:id/read',    ctrl.markRead);

module.exports = router;
