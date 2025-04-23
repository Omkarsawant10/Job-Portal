import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "new job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllJobsByQuery = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        console.log(keyword);
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(200).json({
                message: "Jobs Not Found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(200).json({
                message: "Jobs Not Found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobid = req.params.id;
        const job = await Job.findOne({ _id: jobid }).populate({ path: "applications" });
        if (!job) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

//how many jobs created by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
            createdAt: -1
        });
        if (!jobs) {
            res.status(400).json({
                msg: "No jobs Found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const updateData = { title, description, requirements, salary, location, jobType, experience, position, companyId };

        const updatedjob = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });
        return res.status(200).json({
            message: "Job Infromation Updated",
            updatedjob,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
