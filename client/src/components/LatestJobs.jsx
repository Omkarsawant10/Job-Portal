import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";



const LatestJobs = () => {
    const {getAllJobs}=useSelector(state=>state.jobs)
   
    return (
        <div className="max-w-7xl mx-auto my-20">
            <h1 className="text-4xl font-bold text-center"><span className="text-[#6A38C2]">Latest & Top</span> Job Openings</h1>
            {/* //mutiple card display */}
            <div className="grid grid-cols-3 gap-4 my-5">
                {
                    getAllJobs.length<=0? <span>No Jobs Availabel</span> :getAllJobs.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs
