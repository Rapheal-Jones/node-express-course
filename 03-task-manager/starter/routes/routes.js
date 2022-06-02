const express = require('express');
const router = express.Router();

//get all functions from controllers
const { getAllTasks, getTasks, createTasks, patchTasks, deleteTasks } = require('../controller/tasks');


//routes starting with /api/v1/tasks

router.route('/').get(getAllTasks).post(createTasks)
router.route('/:id').get(getTasks).patch(patchTasks).delete(deleteTasks)



module.exports = router
