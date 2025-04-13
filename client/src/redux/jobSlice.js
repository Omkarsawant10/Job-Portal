import { createSlice } from "@reduxjs/toolkit";


const jobSlice=createSlice({
    name:"job",
    initialState:{
        getAllJobs:[],
        getAllJobsQuery:[],
        allAdminJobs:[],
        singleJob:{},
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
        searchedQueryBrowse:""
    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
             state.getAllJobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload;
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText=action.payload;
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs=action.payload;
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery=action.payload
        },
        setAllJobsQuery:(state,action)=>{
            state.getAllJobsQuery=action.payload;
        },
        setSearchedQueryBrowse:(state,action)=>{
            state.searchedQueryBrowse=action.payload;
        }
    }
})

export const {setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchedQuery,setAllJobsQuery,setSearchedQueryBrowse}=jobSlice.actions;
export default jobSlice.reducer;