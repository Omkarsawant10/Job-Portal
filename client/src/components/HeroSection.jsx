import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useDispatch } from "react-redux";
import {  setSearchedQueryBrowse } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
    const [query,setQuery]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const searchJobHandler=()=>{
         dispatch(setSearchedQueryBrowse(query))
         navigate("/browse")
    }
    return (
        <div className="text-center">
            <div className="flex flex-col gap-5 my-10">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium">No.1 Job Hunt Website
                </span>
                <h1 className="text-5xl font-bold">Search, Apply & <br /> Get Your <span className="text-[#6A38C2]">Dream Jobs</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, dolor vero placeat iure voluptatem distinctio?</p>
                <div className="flex w-[40%] shadow-lg rounded-full border border-gray pl-3 items-center gap-4 mx-auto">
                    <input type="text" placeholder="Find You Dream Jobs?" onChange={(e)=>setQuery(e.target.value)} className="outline-none border-none w-full"/>
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6a38c2]">
                        <Search className="h-5 w-7"/>
                    </Button>
                </div>
            </div>
            
        </div>
    )
}

export default HeroSection
