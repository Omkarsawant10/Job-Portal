import { setAllJobs, setSingleJob } from "@/redux/jobSlice"
import { JOB_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"



export const useGetSingleJob=(jobId)=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        
        const fetchSingleJob=async ()=>{
            try {
                const response=await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                console.log(response.data)
                if(response.data.success){
                    dispatch(setSingleJob(response.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob()
    },[])
}
