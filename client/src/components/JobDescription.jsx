import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constants";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { Briefcase, MapPin, CalendarDays } from "lucide-react";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.jobs);
    const { user } = useSelector((state) => state.auth);

    const isInitiallyApplied =
        singleJob?.applications?.some(
            (application) => application?.applicant === user?._id
        ) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true,
            });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?.id }],
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    dispatch(setSingleJob(response.data.job));
                    setIsApplied(
                        response.data.job.applications.some(
                            (application) => application.applicant === user?.id
                        )
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?.id]);

    return (
        <>
            <Navbar/>
            <div className="max-w-6xl mx-auto py-10 px-4">
                <div className="bg-white shadow-md rounded-2xl p-6 md:p-10 relative">
                    {/* Job Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-gray-900">{singleJob?.title}</h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Briefcase size={16} /> {singleJob?.position} Openings
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={16} /> {singleJob?.location}
                                </div>
                                <div className="flex items-center gap-1">
                                    <CalendarDays size={16} /> Posted on {singleJob?.createdAt?.split("T")[0]}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                <Badge className="text-blue-700 font-medium" variant="ghost">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className="text-purple-700 font-medium" variant="ghost">
                                    {singleJob?.salary} LPA
                                </Badge>
                                <Badge className="text-emerald-600 font-medium" variant="ghost">
                                    {singleJob?.experienceLevel} Experience
                                </Badge>
                            </div>
                        </div>

                        <div className="sticky top-4 md:top-20 w-full md:w-auto">
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`w-full md:w-auto rounded-xl px-6 py-2 text-white transition-all duration-300 ${isApplied
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-purple-700 hover:bg-purple-600"
                                    }`}
                            >
                                {isApplied ? "Already Applied" : "Apply Now"}
                            </Button>
                        </div>
                    </div>

                    {/* Job Details Section */}
                    <div className="mt-10 space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Job Description</h2>
                            <p className="text-gray-700 leading-relaxed">{singleJob?.description}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Overview</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                                <p><strong>Job Role:</strong> {singleJob?.title}</p>
                                <p><strong>Location:</strong> {singleJob?.location}</p>
                                <p><strong>Type:</strong> {singleJob?.jobType}</p>
                                <p><strong>Salary:</strong> {singleJob?.salary} LPA</p>
                                <p><strong>Experience:</strong> {singleJob?.experienceLevel}</p>
                                <p><strong>Openings:</strong> {singleJob?.position}</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Application</h2>
                            <p className="text-gray-700">
                                <strong>Total Applicants:</strong> {singleJob?.applications?.length}
                            </p>
                            <p className="text-gray-700">
                                <strong>Status:</strong>{" "}
                                {isApplied ? (
                                    <span className="text-green-600 font-medium">You have applied</span>
                                ) : (
                                    <span className="text-red-500 font-medium">Not applied yet</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDescription;
