const express = require('express');
const router = new express.Router();
const TaskController = require('../controllers/task-controller');


router.get('/', TaskController.showTasks);

router.get('/zadania/dodaj', TaskController.showCreateForm);
router.post('/zadania/dodaj', TaskController.create);

router.get('/zadania/:id/edytuj', TaskController.showEditForm);
router.post('/zadania/:id/edytuj', TaskController.edit);
router.post('/zadania/:id/zmien-stan', TaskController.toggleDone);

router.get('/zadania/:id/usun', TaskController.delete);

module.exports = router;