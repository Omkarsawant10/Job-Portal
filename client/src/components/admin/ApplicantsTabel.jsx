import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constants'

const shortlistingStatus = ["Accepted", "Rejected"]
const ApplicantsTabel = () => {
    const { applicants } = useSelector(state => state.application);
    const statusHandler=async(status,id)=>{
        try {
            const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants?.applications?.map((application) => {
                            return (
                                <TableRow key={application?._id}>
                                    <TableCell>{application?.applicant?.fullname}</TableCell>
                                    <TableCell>{application?.applicant?.email}</TableCell>
                                    <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                                    <TableCell>
                                        {
                                            application?.applicant?.profile?.resume ? <a className='text-blue-600 cursor-pointer' href={application?.applicant?.profile?.resume} target='blank'>{application?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                        }
                                    </TableCell>
                                    <TableCell>{application?.applicant?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {
                                                    shortlistingStatus.map((status, index) => {
                                                        return (
                                                            <div key={index} onClick={()=>statusHandler(status,application?._id)} className='flex w-fit items-center my-2 cursor-pointer'>
                                                                <span>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTabel


