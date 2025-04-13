import {  setAllJobs } from "@/redux/jobSlice"
import { JOB_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"



export const useGetAllJobs=()=>{
    const dispatch=useDispatch();
    const {searchedQuery}=useSelector(state=>state.jobs);
    useEffect(()=>{
        
        const fetchAllJobs=async ()=>{
            try {
                const response=await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                
                if(response.data.success){
                    dispatch(setAllJobs(response.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs()
    },[])
}