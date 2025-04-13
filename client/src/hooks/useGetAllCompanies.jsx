import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



export const useGetAllCompanies=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        
        const fetchCompanies=async ()=>{
            try {
                const response=await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                console.log(response,"company")
                if(response.data.success){
                    dispatch(setCompanies(response?.data?.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies()
    },[])
}