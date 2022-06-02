const Task = require('../modals/Tasks')
const asyncWrapper = require('../middleware/asyncWrapper')
const { customErrorFunc } = require('../errors/customError')

//defining our logic for each functionality
const getAllTasks = asyncWrapper(async (req, res) => {
    const task = await Task.find({})
    res.status(200).json({ task });
})

const createTasks = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task });
})

const getTasks = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params
    const tasks = await Task.findOne({ _id: taskId })

    if (!tasks) {
        return next(customErrorFunc(`No task found with the taskId : ${taskId}`, 404))
    }

    res.status(200).json({ tasks });
})

const deleteTasks = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const tasks = await Task.findOneAndDelete({ _id: taskId })

    if (!tasks) {
        return next(customErrorFunc(`No task found with the taskId : ${taskId}`, 404))
    }

    res.status(200).json({ tasks });
})

const patchTasks = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const tasks = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true
    })

    if (!tasks) {
        return next(customErrorFunc(`No task found with the taskId : ${taskId}`, 404))
    }

    res.status(200).json({ tasks });
})


module.exports = {
    getAllTasks, getTasks, createTasks, patchTasks, deleteTasks,
}