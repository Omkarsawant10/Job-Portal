import { useEffect } from "react"
import Navbar from "../shared/Navbar"
import ApplicantsTabel from "./ApplicantsTabel"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "@/utils/constants"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAllApplicants } from "@/redux/applicationSlice"

const Applicants = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const {applicants}=useSelector(state=>state.application);
  useEffect(()=>{
       const fetchAllApplicants=async()=>{
          const res=await axios.get(`${APPLICATION_API_END_POINT}/${id}/applicants`,{withCredentials:true});
          console.log(res)
          if(res.data.success){
              dispatch(setAllApplicants(res.data.job));
          }
       }
       fetchAllApplicants()
  },[])
  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto">
          <h1 className="font-bold text-xl my-5">Applicants ({applicants?.applications?.length})</h1>
          <ApplicantsTabel/>
      </div>
    </div>
  )
}

export default Applicants
