import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



export const useGetCompanyById=(id)=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        
        const fetchSingleCompany=async ()=>{
            try {
                const response=await axios.get(`${COMPANY_API_END_POINT}/get/${id}`,{withCredentials:true});
                console.log(response.data)
                if(response.data.success){
                    dispatch(setSingleCompany(response?.data?.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany()
    },[id,dispatch])
}