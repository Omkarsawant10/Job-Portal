import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {  useDispatch, useSelector } from 'react-redux'

import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'

import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useGetSingleJob } from '@/hooks/useGetSingleJob'
import { setSingleJob } from '@/redux/jobSlice'


const JobUpdate = () => {
    const params = useParams();
    useGetSingleJob(params.id);
    const { singleJob } = useSelector(state => state.jobs);
    console.log(singleJob,"singlejob");
    const dispatch=useDispatch();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,

    })
    useEffect(() => {
        setInput(
            {
                title: singleJob.title,
                description: singleJob.description                ,
                requirements: singleJob.requirements                ,
                salary: singleJob.salary                ,
                location: singleJob.location,
                jobType: singleJob.jobType                ,
                experience: singleJob.experienceLevel,
                position: singleJob.position,

            }
        )
    }, [singleJob]);


    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { companies } = useSelector(state => state.company);
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => {
            return { ...prev, [name]: value }
        })
    }



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            console.log(res)
            if (res.data.success) {
                dispatch(setSingleJob(res.data.updatedjob))
                toast.success(res.data.message);
                navigate("/admin/jobs")

            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input type="number" name="salary" value={input.salary} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>No Of Positions</Label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1" />
                        </div>

                    </div>

                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait</Button> :
                            <Button type="Submit" className="w-full my-4">Update Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default JobUpdate;
