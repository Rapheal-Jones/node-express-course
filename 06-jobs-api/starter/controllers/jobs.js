const model = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const createJob = async (req, res) => {
    req.body.createdBy = req.user.id
    const job = await model.create(req.body)
    res.status(StatusCodes.OK).json({ job })
}

const getAllJob = async (req, res) => {
    const jobs = await model.find({ createdBy: req.user.id }).sort('createdAt')
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}


const getJob = async (req, res) => {
    const job = await model.findOne({ createdBy: req.user.id, _id: req.params.id })
    if (!job || job.length == 0) {
        throw new NotFoundError(`No Job found for ${req.user.id} user with jobId ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const { user: { id: userId }, params: { id: jobId } } = req
    const job = await model.findOneAndDelete({ createdBy: userId, _id: jobId })
    if (!job) {
        throw new NotFoundError(`No Job found for ${userId} user with jobId ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ msg: 'This job is deleted', job })
}

const updateJob = async (req, res) => {
    const { user: { id: userId }, params: { id: jobId }, body: { company, position, status } } = req
    const updatequery = {}

    if (company && company.length > 0) updatequery.company = company
    if (position && position.length > 0) updatequery.position = position
    if (status) updatequery.status = status

    if (Object.keys(updatequery).length === 0) {
        throw new BadRequestError(`No updatable content found for ${userId} user with jobId ${jobId}`)
    }

    const job = await model.findOneAndUpdate({ createdBy: userId, _id: jobId }, updatequery, { new: true, runValidators: true })
    if (!job) {
        throw new NotFoundError(`No Job found for ${userId} user with jobId ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}




module.exports = {
    getAllJob,
    getJob,
    updateJob,
    deleteJob,
    createJob,
}




