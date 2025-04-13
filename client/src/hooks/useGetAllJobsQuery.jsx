import {  setAllJobsQuery } from "@/redux/jobSlice"
import { JOB_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"



export const useGetAllJobsQuery=()=>{
    const dispatch=useDispatch();
    const {searchedQueryBrowse}=useSelector(state=>state.jobs);
    useEffect(()=>{
        
        const fetchAllJobs=async ()=>{
            try {
                const response=await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQueryBrowse}`,{withCredentials:true});
                
                if(response.data.success){
                    dispatch(setAllJobsQuery(response.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs()
    },[searchedQueryBrowse])
}