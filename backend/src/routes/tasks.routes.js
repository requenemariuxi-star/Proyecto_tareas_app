const router = require('express').Router();
const auth   = require('../middleware/authMiddleware');
const ctrl   = require('../controllers/tasks.controller');

router.use(auth);

router.get('/',            ctrl.getAll);
router.get('/today',       ctrl.getToday);
router.get('/pending',     ctrl.getPending);
router.get('/completed',   ctrl.getCompleted);
router.post('/',           ctrl.create);
router.put('/:id',         ctrl.update);
router.patch('/:id/complete', ctrl.toggleComplete);
router.delete('/:id',      ctrl.remove);

module.exports = router;
