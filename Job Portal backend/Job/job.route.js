import express from "express"
import { isSeeker, isProvider, isUser } from "../auth/auth.middleware.js"
import {
    addJob,
    deleteJob,
    getJobDetails,
    getAllJobs,
    getProviderJobs,
    editJob
} from "./job.service.js"

const router = express.Router()

// add job
router.post("/job/add", isProvider, addJob)

// delete job
router.delete("/job/delete/:id",isProvider, deleteJob)

// get job details
router.get("/job/details/:id", isUser, getJobDetails)

// get all jobs by seeker
router.post("/jobs/seeker/all", isSeeker, getAllJobs)

// get all jobs by provider
router.post("/jobs/provider/all", isProvider, getProviderJobs)

// edit jobs
router.put("/job/edit/:id", isProvider, editJob)

export default router