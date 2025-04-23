import express from "express";
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getAllJobsByQuery, getJobById, postJob, updateJob } from "../controllers/job.controller.js";

const router=express.Router();
router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(getAllJobs);
router.route("/getjobquery").get(getAllJobsByQuery);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/update/:id").put(isAuthenticated,updateJob);

export default router;
