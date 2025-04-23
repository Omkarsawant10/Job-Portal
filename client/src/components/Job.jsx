import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200 flex flex-col h-[400px] w-[300px]'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark className="w-4 h-4" />
                </Button>
            </div>

            {/* Company Info */}
            <div className='flex items-center gap-2 my-3'>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-base line-clamp-1'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            {/* Job Info */}
            <div className='flex-grow'>
                <h1 className='font-bold text-lg mb-1 line-clamp-1'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-4 mb-2'>{job?.description}</p>
            
                {/* Badges - Moved inside the flex-grow container */}
                <div className='flex items-center gap-2 flex-wrap'>
                    <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
                    <Badge className="text-[#f83002] font-bold" variant="ghost">{job?.jobType}</Badge>
                    <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary}LPA</Badge>
                </div>
            </div>

            {/* Buttons - mt-auto to push to bottom */}
            <div className='flex items-center gap-4 mt-auto'>
                <Button variant="outline" className="flex-1" onClick={() => navigate(`/description/${job?._id}`)}>
                    Details
                </Button>
                <Button className="flex-1 bg-[#7209b7] hover:bg-[#5e08a0]">
                    Save For Later
                </Button>
            </div>
        </div>
    )
}

export default Job