import Joi from "joi"
import mongoose from "mongoose"
import { getAllJobsValidation, jobSchema } from "./job.validation.js"
import { Job } from "./job.entity.js"


export const addJob = async(req, res) => {
    // extract job from req.body
    const newJob = req.body

    // validate job
try {
    await jobSchema.validateAsync(newJob)
} catch (error) {
        // if not validate terminate
    return res.status(400).send({message:error.message})
    }

    // adding providerId
    newJob.providerId = req.userInfo._id

    // replacing date
    // newJob.validDate = new Date(newJob.validDate).toISOString()
    // .replace('T', ' ')
    // .replace('Z', '')

    // add job
    await Job.create(newJob)
    
    return res.status(201).send({message:"Job added successfully."})
}

export const deleteJob =async(req, res) => {
    // extract id from params
    const jobId = req.params.id

    // check if valid mongoId
    const isValidMongoId = mongoose.Types.ObjectId.isValid(jobId)

    // if not , terminate
    if (!isValidMongoId) {
        return res.status(400).send({ message: "Invalid MongoId." })
    }    
   
    // check if product exists
    const job = await Job.findOne({_id: jobId})
    // if not ,terminate
    if (!job) {
    return res.status(404).send({ message: "Job does not exist." })
    }

    // logged in user must be owner of the product
    const loggedInUserId = req.userInfo._id
    
    const isJobOwner = loggedInUserId.equals(job.providerId)
    // if not ,terminate
    if (!isJobOwner) {
        return res.status(404).send({message:"You are not owner of the job."})
    }

    // delete job
    await Job.deleteOne({_id:jobId})

    return res.status(201).send({message:"job deleted successfully."})
}

export const getJobDetails = async (req, res) => {
    // extract jobId from params
    const jobId = req.params.id

    // validate id for mongoId validity
    const isValidMongoId = mongoose.Types.ObjectId.isValid(jobId)
    
    // if not valid, terminate
    if (!isValidMongoId) {
        return res.status(401).send({message:"Invalid Mongo Id."})
    }
    // check if job exists
    const job = await Job.findOne({ _id: jobId })
    
    // if not job, terminate
    if (!job) {
        return res.status(404).send({message:"Job does not exist."})
    }

    // return job
    return res.status(200).send(job)
}

export const getAllJobs = async (req, res) => {
// extract page and limit from req.body
    const query = req.body

    // validate query
    try {
        await getAllJobsValidation.validateAsync(query)
    } catch (error) {
        return res.status(400).send({message: error.message})
    }

    const skip = (query.page-1) * query.limit
    const jobs = await Job.aggregate([
        {
            $match:{}
        },
        {
            $skip:skip
        },
        {
            $limit:query.limit
        }
    ])
    return res.status(200).send(jobs)
}

export const getProviderJobs = async (req, res) => {
// extract page and limit from req.body
    const query = req.body

    // validate query
    try {
        await getAllJobsValidation.validateAsync(query)
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
    const skip = (query.page-1) * query.limit
    const jobs = await Job.aggregate([
        {
            $match:{providerId : req.userInfo._id}
        },
        {
            $skip:skip
        },
        {
            $limit:query.limit
        }
    ])
    return res.status(200).send(jobs)
}

export const editJob = async (req, res) => {
    // extract jobId from params
    const jobId = req.params.id

    // validate id for mongoId validity
    const isValidMongoId = mongoose.Types.ObjectId.isValid(jobId)
    
    // if not valid, terminate
    if (!isValidMongoId) {
        return res.status(401).send({message:"Invalid Mongo Id."})
    }
    // check if product exists
    const job = await Job.findOne({ _id: jobId })
    
    // if not product, terminate
    if (!job) {
        return res.status(404).send({message:"Job does not exist."})
    }

    // extract product from req.body
    const jobDetails = req.body

    // validate product
    try {
    await jobSchema.validateAsync(jobDetails)
    } catch (error) {

    // if not validate terminate
    return res.status(400).send({message:error.message})
    }

    // edit product
    await Job.updateOne({ _id: jobId }, { $set: jobDetails })
    
    return res.status(201).send({message:"Job edited successfully."})
}