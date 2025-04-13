import React, { useEffect } from 'react'
import Job from './Job';
import Navbar from './shared/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import {  setSearchedQueryBrowse } from '@/redux/jobSlice';

import { useGetAllJobsQuery } from '@/hooks/useGetAllJobsQuery';


const Browse = () => {
    
    useGetAllJobsQuery();
    const {getAllJobsQuery}=useSelector(state=>state.jobs)
    const dispatch=useDispatch();
    useEffect(()=>{
        return ()=>{
          dispatch(setSearchedQueryBrowse(""))
        }
    },[])
    
    return (
        <div>
            <Navbar/>
            <div className='max-w-7xl mx-auto my-10'>

                <h1 className='text-lg font-bold my-10'>Search Results {getAllJobsQuery.length}</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        getAllJobsQuery.map((job) => {
                            return (
                                <Job key={job?._id} job={job}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse
