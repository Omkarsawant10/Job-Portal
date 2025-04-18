import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            res.status(200).json({
                message: "You can't register same compnay",
                company,
                success: false
            })
        }
        company = await Company.create({ name: companyName, userId: req.id });
        return res.status(200).json({
            message: "Company Registered successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

//get companybyId
export const getCompanyById = async (req, res) => {
    const compnayId = req.params.id;

    const company = await Company.findById(compnayId);
    if (!company) {
        return res.status(400).json({
            message: "Company Not Found",
            success: false,
        })
    }

    return res.status(200).json({
        company,
        success: true
    })
}

export const updateCompany = async (req, res) => {
    const { name, description, website, location } = req.body;

    const file = req.file;

    //cloudinary logic
    
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url;
 

    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
    return res.status(200).json({
        message: "Company Infromation Updated",
        company,
        success: true
    })
}

